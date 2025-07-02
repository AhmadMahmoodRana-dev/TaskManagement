import { Router } from "express";
import { authenticateToken } from "../../middlewares/Auth.middleware.js";
import { addProjectMessage, deleteProjectMessage, getProjectMessages, updateProjectMessage } from "../../controllers/Chat.controller.js";

const chatRoute = Router();


chatRoute.post("/project/:projectId/messages", authenticateToken, addProjectMessage);
chatRoute.get("/projects/:projectId/messages", authenticateToken, getProjectMessages);
chatRoute.put("/projects/:projectId/messages/:messageId", authenticateToken, updateProjectMessage);
chatRoute.delete("/projects/:projectId/messages/:messageId", authenticateToken, deleteProjectMessage);



export default chatRoute;