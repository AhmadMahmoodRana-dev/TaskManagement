import {Router} from "express"
import { authenticateToken } from "../../middlewares/Auth.middleware.js";
import { addMember, CreateProject, getMyProjects, getProjectDetail, updateProjectProgress, updateProjectStatus } from "../../controllers/Project.controller.js";

const ProjectRoute = Router();

ProjectRoute.post("/project/create",authenticateToken,CreateProject)
ProjectRoute.post("/project/:projectId/addmembers",authenticateToken,addMember)
ProjectRoute.put("/project/:projectId/progress",authenticateToken,updateProjectProgress)
ProjectRoute.put("/project/:projectId/status",authenticateToken,updateProjectStatus)
ProjectRoute.get("/project/singleProject/:projectId",authenticateToken,getProjectDetail)
ProjectRoute.get("/project/myprojects",authenticateToken,getMyProjects)


export default ProjectRoute;