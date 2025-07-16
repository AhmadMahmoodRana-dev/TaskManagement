import { Router } from "express";
import { authenticateToken } from "../../middlewares/Auth.middleware.js";
import {
  addProjectMessage,
  deleteProjectMessage,
  getProjectMessages,
  updateProjectMessage,
} from "../../controllers/Chat.controller.js";
import multer from "multer";
const chatRoute = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB file size limit
  },
});

// Apply to your message route
chatRoute.post(
  "/project/:projectId/messages",
  upload.single("file"),
  authenticateToken,
  addProjectMessage
);

// chatRoute.post("/project/:projectId/messages", authenticateToken, addProjectMessage);
chatRoute.get(
  "/projects/:projectId/messages",
  authenticateToken,
  getProjectMessages
);
chatRoute.put(
  "/projects/:projectId/messages/:messageId",
  authenticateToken,
  updateProjectMessage
);
chatRoute.delete(
  "/projects/:projectId/messages/:messageId",
  authenticateToken,
  deleteProjectMessage
);

export default chatRoute;
