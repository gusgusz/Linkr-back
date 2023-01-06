import { connectionDb } from "../database/db.js";
import { userRepository } from "../repositories/getUser.repository.js";
import insertNewPostRepository from "../repositories/insertNewPost.repository.js";
import urlMetadata from "url-metadata";
<<<<<<< HEAD
=======

>>>>>>> f8a690eefd1a010c6f1387a2311c62fd2ce8c436


export const getPosts = async (req, res) => {
  

  try{
  const response = await connectionDb.query(
    `SELECT users.username, users."pictureUrl", posts.* FROM posts JOIN users ON posts."userId" = users.id 
    ORDER BY posts."createdAt" DESC;`
    );
    if(response.rowCount === 0) {
      return res.status(404).send("There are no posts yet");
    }
    const data = response.rows;
    
    const posts = await Promise.all(data.map(async (post) => {
      const { url } = post;
      const metadata = await urlMetadata(url);
      const { title, description, image } = metadata;
      delete post.createdAt;
      return { ...post, title, description, image };
    }));
   
  res.status(200).send(posts);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while trying to fetch the posts, please refresh the page");
  }
}

export const postPosts = async (req, res) =>{
  try{
    const { authorization } = req.headers;
        const token = authorization.replace('Bearer ', '');

        const userId = await userRepository.getUser(token);

        const {url, caption} = req.body;

        await insertNewPostRepository(res, url, caption, userId);
    
        res.sendStatus(201);
  } catch (err){
    res.status(500).send(err.message);
  }
}