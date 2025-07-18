import { Router } from "express";
import getAllLogs from "../../controllers/Logs.controller.js";

const LogRoute = Router();

LogRoute.get("/logs",getAllLogs)


export default LogRoute;