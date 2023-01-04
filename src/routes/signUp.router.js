import { Router } from "express";
import signUpController from "../controllers/authcontroller/signup.controller.js";


const signUpRouter = Router();

signUpRouter.post("/signup" , signUpController);

export default signUpRouter;