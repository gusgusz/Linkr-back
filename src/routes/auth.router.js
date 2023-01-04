import { Router } from "express";
import signUpController from "../controllers/authcontroller/signup.controller.js";


const authRouter = Router();

authRouter.post("/signup" , signUpController);

export default authRouter;