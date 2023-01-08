import { Router } from "express";
import deletePostController from "../controllers/deletePost.controller.js";
import bearerAuthenticationMiddleware from "../middlewares/bearerAuthentication.middleware.js";
import postIdAuthenticationMiddleware from "../middlewares/postIdAuthentication.middleware.js";

const deletePostRouter = Router();

deletePostRouter.delete("/delete-post/:id" , bearerAuthenticationMiddleware , postIdAuthenticationMiddleware, deletePostController );

export default deletePostRouter;