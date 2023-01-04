import { Router } from "express";
import signUpRouter from "./signUp.router.js";

const router = Router();

router.use(signUpRouter);

export default router;