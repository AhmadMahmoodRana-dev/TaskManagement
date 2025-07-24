import fs from "fs";
import path from "path";
import ChatMessage from "../schema/ChatMessage.schema.js";
import Project from "../schema/Project.schema.js";
import { fileURLToPath } from "url";
import Log from "../schema/Logs.schema.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST /api/project/:projectId/messages
export const addProjectMessage = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?.userId;
    const { message, type = "text" } = req.body;

    // Validate user authentication
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (!Array.isArray(project.members)) {
      return res
        .status(400)
        .json({ error: "Project members not defined properly" });
    }

    // Safe member check using equals()
    const isMember = project.members.some(
      (member) => member?.user && member.user.equals(userId)
    );

    if (!isMember) {
      return res.status(403).json({ error: "Not a project member" });
    }

    const newMessage = new ChatMessage({
      project: projectId,
      sender: userId,
      type,
    });

    if (type === "text") {
      if (!message) {
        return res.status(400).json({ error: "Message text is required" });
      }
      newMessage.message = message;
    } else if (["file", "voice"].includes(type)) {
      if (!req.file) {
        return res.status(400).json({
          error: "File is required for file/voice messages",
        });
      }

      const fileTypeDir = type === "voice" ? "voice_messages" : "documents";
      const uploadDir = path.join(__dirname, "..", "uploads", fileTypeDir);

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const newPath = path.join(uploadDir, req.file.filename);
      fs.renameSync(req.file.path, newPath);

      newMessage.fileUrl = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${fileTypeDir}/${req.file.filename}`;
      newMessage.fileName = req.file.originalname;
      newMessage.fileType = req.file.mimetype;
      newMessage.fileSize = req.file.size;
    } else {
      return res.status(400).json({ error: "Invalid message type" });
    }

    await newMessage.save();

    const io = req.app.get("io"); // Get io instance from Express app

    io.to(projectId).emit("receiveMessage", {
      _id: newMessage._id,
      project: newMessage.project,
      sender: {
        _id: userId,
        name: req.user?.name || "Unknown",
      },
      message: newMessage.message,
      type: newMessage.type,
      fileUrl: newMessage.fileUrl,
      fileName: newMessage.fileName,
      fileType: newMessage.fileType,
      fileSize: newMessage.fileSize,
      createdAt: newMessage.createdAt,
    });

    await Log.create({
      action: "Message Sent",
      user: userId,
      project: projectId,
      description:
        type === "text"
          ? `Text message sent by user ${userId}`
          : `${
              type.charAt(0).toUpperCase() + type.slice(1)
            } file sent by user ${userId}`,
    });

    res.status(201).json({
      success: true,
      data: newMessage,
    });
  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Server error while adding message" });
  }
};

// GET /api/project/:projectId/messages
export const getProjectMessages = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?.userId;

    // Validate user authentication
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    if (!Array.isArray(project.members)) {
      return res
        .status(400)
        .json({ error: "Project members not defined properly" });
    }

    // Safe member check using equals()
    const isMember = project.members.some(
      (member) => member?.user && member.user.equals(userId)
    );

    if (!isMember) {
      return res.status(403).json({ error: "Not a project member" });
    }

    const messages = await ChatMessage.find({ project: projectId })
      .sort({ createdAt: 1 })
      .populate("sender", "name email")
      .lean();

    res.status(200).json({
      success: true,
      data: messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Server error while fetching messages" });
  }
};

// PUT /api/project/:projectId/messages/:messageId
export const updateProjectMessage = async (req, res) => {
  try {
    const { projectId, messageId } = req.params;
    const { message } = req.body;
    const userId = req.user?.userId;

    // Validate user authentication
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const chatMessage = await ChatMessage.findById(messageId);
    if (!chatMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (!chatMessage.project.equals(projectId)) {
      return res
        .status(400)
        .json({ error: "Message doesn't belong to this project" });
    }

    // Safe sender comparison using equals()
    if (!chatMessage.sender.equals(userId)) {
      return res
        .status(403)
        .json({ error: "You can only update your own messages" });
    }

    if (chatMessage.type !== "text") {
      return res
        .status(400)
        .json({ error: "Only text messages can be edited" });
    }

    chatMessage.message = message;
    await chatMessage.save();

    await Log.create({
      action: "Message Edited",
      user: userId,
      project: projectId,
      description: `User ${userId} edited a text message in project ${projectId}`,
    });

    res.status(200).json({
      success: true,
      data: chatMessage,
    });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ error: "Server error while updating message" });
  }
};

// DELETE /api/project/:projectId/messages/:messageId
export const deleteProjectMessage = async (req, res) => {
  try {
    const { projectId, messageId } = req.params;
    const userId = req.user?.userId;

    // Validate user authentication
    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ error: "Project not found" });

    const chatMessage = await ChatMessage.findById(messageId);
    if (!chatMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    if (!chatMessage.project.equals(projectId)) {
      return res
        .status(400)
        .json({ error: "Message doesn't belong to this project" });
    }

    // Safe sender comparison using equals()
    if (!chatMessage.sender.equals(userId)) {
      return res
        .status(403)
        .json({ error: "You can only delete your own messages" });
    }

    await chatMessage.deleteOne();

    await Log.create({
      action: "Message Deleted",
      user: userId,
      project: projectId,
      description: `User ${userId} deleted a ${chatMessage.type} message in project ${projectId}`,
    });

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Server error while deleting message" });
  }
};
