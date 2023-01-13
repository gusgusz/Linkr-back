import express from 'express';
import cors from "cors";
import routerPosts from "./routes/posts.router.js";
import dotenv from "dotenv";
import authRouter from './routes/auth.router.js';
import likeRouter from './routes/likes.router.js';
import deletePostRouter from './routes/deletePost.router.js';
import commentRouter from './routes/comments.router.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(routerPosts);
app.use(authRouter);
app.use(likeRouter);
app.use(deletePostRouter);
app.use(commentRouter);

const Port = process.env.PORT || 5000;

app.listen(Port, () => console.log(`Server running in port ${Port}`));