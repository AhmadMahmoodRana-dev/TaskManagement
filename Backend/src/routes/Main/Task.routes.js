import { Router } from "express";

import { createTask, deleteTask, getMyTasks, getTaskById, getTasksByProject, updateTask } from "../../controllers/Task.controller.js";
import { authenticateToken } from "../../middlewares/Auth.middleware.js";

const TaskRoute = Router();

TaskRoute.post("/task", authenticateToken, createTask);
TaskRoute.get("/task/my", authenticateToken, getMyTasks);
TaskRoute.get("/task/:taskId", authenticateToken, getTaskById);
TaskRoute.get("/task/project/:projectId", authenticateToken, getTasksByProject);
TaskRoute.put("/task/:taskId", authenticateToken, updateTask);
TaskRoute.delete("/task/:taskId", authenticateToken, deleteTask);

export default TaskRoute;
