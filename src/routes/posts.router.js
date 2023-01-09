import { Router } from "express";
import { getPosts, postPosts, getTrendingPosts, getUserPosts, updateUserPost } from "../controllers/posts.controller.js";
import { getLikes } from "../controllers/likes.controller.js";
import { getUsersBySearch } from "../controllers/users.controller.js";
import { postBodyValidation } from "../middlewares/postsBodyValidation.middleware.js";
import { tokenValidation } from "../middlewares/tokenValidations.middleware.js";

const router = Router();

router.get("/timeline", tokenValidation ,getPosts);
router.post("/timeline", tokenValidation, postBodyValidation, postPosts);
router.get("/hashtag/:hashtag", getTrendingPosts);
router.get("/user/:userId", getUserPosts);
router.put("/timeline", updateUserPost);
router.get("/likes/:postId", tokenValidation, getLikes);
router.get("/usersearch/:username", getUsersBySearch);

export default router;