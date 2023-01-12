import { connectionDb } from "../database/db.js";


export const postShare = async (req, res) => {
  

    try{
  
      const hashtags = await getTrandings();
  
    const response = (await connectionDb.query(
      `SELECT users.username, users."pictureUrl", posts.*,
       COALESCE(COUNT(likes."postId"),0) AS "numberOfLikes",
       COALESCE(COUNT(shares."postId"),0) AS "numberOfShares"
       FROM posts 
       LEFT JOIN users ON posts."userId" = users.id 
       LEFT JOIN likes ON likes."postId" = posts.id
       LEFT JOIN shares ON shares."postId" = posts.id
       WHERE posts.id = 1
       GROUP BY users.username, users."pictureUrl", posts.id 
       ;`
  
  
      )).rows;
      
      if(response.rowCount === 0) {
        return res.status(404).send("There are no posts yet");
      }
      
   
      const posts = await Promise.all(response.map(async (post) => {
        const { url } = post;
        const metadata = await urlMetadata(url);
        const { title, description, image } = metadata;
        delete post.createdAt;
        return { ...post, title, description, image};
      }));
      
    res.status(200).send({hashtags, posts});
    } catch (error) {
      //res.status(500).send("An error occurred while trying to fetch the posts, please refresh the page");
      res.send(error.message)
    } 
  }