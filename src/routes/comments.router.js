import { Router } from "express";
import commentController from "../controllers/commentscontroller/comment.controller.js";
import getCommentsPostController from "../controllers/commentscontroller/getCommentsPost.controller.js";
import {tokenValidation} from "../middlewares/tokenValidations.middleware.js"
const commentRouter = Router();

commentRouter.post("/comment/:postId" , tokenValidation , commentController );

commentRouter.get("/comments/:postId" , getCommentsPostController);

export default commentRouter;