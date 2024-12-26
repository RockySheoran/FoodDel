import express from "express"
import { loginUser, registerUser } from "../controller/userControler.js";





const app = express();
export const userRouter = express.Router();

userRouter.post ('/register',registerUser)
userRouter.post ('/login',loginUser)
