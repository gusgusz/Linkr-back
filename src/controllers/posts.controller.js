import { connectionDb } from "../database/db.js";
import urlMetadata from "url-metadata";


export const getPosts = async (req, res) => {
  

  try{
  const response = await connectionDb.query(
    `SELECT users.username, users."pictureUrl", posts.* FROM posts JOIN users ON posts."userId" = users.id 
    ORDER BY posts."createdAt" DESC
     
      ;`
    );
    if(response.rowCount === 0) {
      return res.status(404).send("There are no posts yet");
    }
    const data = response.rows;
    
    const posts = await Promise.all(data.map(async (post) => {
      if(post.caption.includes("#")){
        const hashtags = post.caption.match(/#[a-zA-Z]+/g);
        post.hashtags = hashtags;
      }
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