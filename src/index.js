import express from 'express';
import cors from "cors";
import routerPosts from "./routes/routerPosts.js";
import dotenv from "dotenv";
import authRouter from './routes/auth.router.js';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(routerPosts);



app.use(authRouter);

const Port = process.env.PORT || 5000;

app.listen(Port, () => console.log(`Server running in port ${Port}`));