import { connectionDb } from "../database/db.js";
import { userRepository } from "../repositories/getUser.repository.js";
import insertNewPostRepository from "../repositories/insertNewPost.repository.js";

export const getPosts = async (req, res) => {
  try{
  const response = await connectionDb.query(
    `SELECT * FROM posts order by "createdAt" desc Limit 20;`
    );
    if(response.rowCount === 0) {
      return res.status(404).send("There are no posts yet");
    }
  res.status(200).send(response.rows);
  } catch (error) {
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