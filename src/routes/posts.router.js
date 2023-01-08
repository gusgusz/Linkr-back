import { Router } from "express";
import { getPosts, postPosts, getTrendingPosts, getUserPosts } from "../controllers/posts.controller.js";
import { postBodyValidation } from "../middlewares/postsBodyValidation.middleware.js";
import { tokenValidation } from "../middlewares/tokenValidations.middleware.js";

const router = Router();

router.get("/timeline", getPosts);
router.post("/timeline", tokenValidation, postBodyValidation, postPosts);
router.get("/hashtag/:hashtag", getTrendingPosts);
router.get("/user/:userId", getUserPosts);

export default router;