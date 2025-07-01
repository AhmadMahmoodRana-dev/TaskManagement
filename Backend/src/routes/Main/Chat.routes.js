import { Router } from "express";
import { authenticateToken } from "../../middlewares/Auth.middleware.js";
import { addProjectMessage, getProjectMessages } from "../../controllers/Chat.controller.js";

const chatRoute = Router();


chatRoute.post("/project/:projectId/messages", authenticateToken, addProjectMessage);
chatRoute.get("/projects/:projectId/messages", authenticateToken, getProjectMessages);



export default chatRoute;