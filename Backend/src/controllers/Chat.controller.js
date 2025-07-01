import ChatMessage from "../schema/ChatMessage.schema.js";
import Project from "../schema/Project.schema.js";

// POST 
export const addProjectMessage = async (req, res) => {
  try {
    const { projectId } = req.params;
    const { message } = req.body;
    const userId = req.user?.userId;

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if user is a project member
    const isMember = project.members.some(
      (member) => member.user.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({ error: "You are not a member of this project" });
    }

    // Create and save the message
    const newMessage = new ChatMessage({
      project: projectId,
      sender: userId,
      message,
    });

    await newMessage.save();

    res.status(201).json({
      success: true,
      data: newMessage,
    });

  } catch (error) {
    console.error("Error adding message:", error);
    res.status(500).json({ error: "Server error while adding message" });
  }
};


// GET 
export const getProjectMessages = async (req, res) => {
  try {
    const { projectId } = req.params;
    const userId = req.user?.userId;

    // Check if project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }

    // Check if user is a project member
    const isMember = project.members.some(
      (member) => member.user.toString() === userId.toString()
    );

    if (!isMember) {
      return res.status(403).json({ error: "You are not a member of this project" });
    }

    // Fetch messages related to the project
    const messages = await ChatMessage.find({ project: projectId })
      .sort({ createdAt: 1 }) // Optional: Sort by oldest to newest
      .populate("sender", "name email") // Optional: Populate sender's info
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
