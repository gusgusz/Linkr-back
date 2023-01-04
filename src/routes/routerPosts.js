import { Router } from "express";
import { getPosts } from "../controllers/postsControllers.js";

const router = Router();

router.get("/timeline", getPosts);

export default router;

