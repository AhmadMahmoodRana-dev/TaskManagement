import { Router } from "express";
import addSubTask from "../../controllers/Subtask.controller.js";
import { authenticateToken } from "../../middlewares/Auth.middleware.js";

const SubtaskRoute = Router();

SubtaskRoute.post("/addSubtask",authenticateToken,addSubTask)


export default SubtaskRoute;