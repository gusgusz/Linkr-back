import { Router } from "express";
import { getPosts } from "../controllers/posts.controller.js";

const router = Router();

router.get("/timeline", getPosts);

export default router;

