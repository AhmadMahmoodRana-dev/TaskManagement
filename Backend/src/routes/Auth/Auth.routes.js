import {Router} from "express"
import { FetchAllUsers, Login, Register } from "../../controllers/Auth.controller.js";
import { authenticateToken } from "../../middlewares/Auth.middleware.js";

const AuthRoute = Router();

AuthRoute.post("/auth/register",Register)
AuthRoute.post("/auth/login",Login)
AuthRoute.get("/auth/allUser",authenticateToken,FetchAllUsers)

export default AuthRoute;