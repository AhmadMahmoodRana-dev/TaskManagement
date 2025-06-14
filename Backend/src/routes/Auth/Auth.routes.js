import {Router} from "express"
import { FetchAllUsers, getProfile, Login, Register, updateProfile } from "../../controllers/Auth.controller.js";
import { authenticateToken } from "../../middlewares/Auth.middleware.js";

const AuthRoute = Router();

AuthRoute.post("/auth/register",Register)
AuthRoute.post("/auth/login",Login)
AuthRoute.get("/auth/allUser",authenticateToken,FetchAllUsers)
AuthRoute.put("/auth/updateProfile",authenticateToken,updateProfile)
AuthRoute.get("/auth/getProfile/:id",authenticateToken,getProfile)

export default AuthRoute;