import { Router } from "express";
import signUpController from "../controllers/authcontroller/signup.controller.js";
import newUserValidateMiddleware from "../middlewares/newUserValidate.middleware.js";


const authRouter = Router();

authRouter.post("/signup" , newUserValidateMiddleware , signUpController);

export default authRouter;