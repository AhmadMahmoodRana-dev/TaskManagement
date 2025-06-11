import {Router} from "express"
import { Login, Register } from "../../controllers/Auth.controller.js";

const AuthRoute = Router();

AuthRoute.post("/auth/register",Register)
AuthRoute.post("/auth/login",Login)

export default AuthRoute;