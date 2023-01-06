import { Router } from "express";
import signInController from "../controllers/authcontroller/signIn.controller.js";
import signUpController from "../controllers/authcontroller/signUp.controller.js";
import loginValidation from "../middlewares/loginValidation.middleware.js";
import newUserValidateMiddleware from "../middlewares/newUserValidate.middleware.js";
import signInSchemaValidation from "../middlewares/signInSchemaValidate.middleware.js";
import { LogOut} from "../controllers/authcontroller/logout.controller.js";
import { tokenValidation } from "../middlewares/tokenValidations.middleware.js";

const authRouter = Router();

authRouter.post("/signup" , newUserValidateMiddleware , signUpController);
authRouter.post("/signin", signInSchemaValidation, loginValidation, signInController);
authRouter.delete("/logout", tokenValidation, LogOut);

export default authRouter;