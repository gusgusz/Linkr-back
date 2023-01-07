
import { userRepository } from "../repositories/getUser.repository.js";
import insertNewPostRepository from "../repositories/insertNewPost.repository.js";
import { connectionDb } from "../database/db.js";
import urlMetadata from "url-metadata";




export const getPosts = async (req, res) => {
  

  try{
    const hashtags = (await connectionDb.query(`SELECT hashtags.name, COUNT("hashtagPosts"."hashtagId") FROM "hashtagPosts"
    JOIN hashtags ON "hashtagPosts"."hashtagId" = hashtags.id 
    group by hashtags.id
    `)).rows;

  const response = await connectionDb.query(
    `SELECT users.username, users."pictureUrl", posts.* FROM posts JOIN users ON posts."userId" = users.id 
    ORDER BY posts."createdAt" DESC;`
    );
    
    if(response.rowCount === 0) {
      return res.status(404).send("There are no posts yet");
    }
    const data = response.rows;
    console.log(data);
  

    const posts = await Promise.all(data.map(async (post) => {
      const { url } = post;
      const metadata = await urlMetadata(url);
      const { title, description, image } = metadata;
      delete post.createdAt;
      return { ...post, title, description, image };
    }));
    console.log(posts);
   
  res.status(200).send({hashtags,posts});
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

      const postId =  await insertNewPostRepository(res, url, caption, userId);
      

      
      const hashtags = (caption.match(/#[\w\d]+/g)).map((hashtag) => {
      return  ((hashtag.replace('#', '')).toLowerCase()).trim();});
      console.log(hashtags);
      const hashtagsId = await Promise.all(hashtags.map(async (hashtag) => {
        const response = await connectionDb.query(`SELECT id FROM hashtags WHERE name = $1;`, [hashtag]);
        if(response.rowCount === 0){
          const response = await connectionDb.query(`INSERT INTO hashtags (name) VALUES ($1) RETURNING id;`, [hashtag]);
          return response.rows[0].id;
        } else {
          return response.rows[0].id;
        }
      }));
      hashtagsId.map(async (hashtagId) => {
        await connectionDb.query(`INSERT INTO "hashtagPosts" ("postId", "hashtagId") VALUES ($1, $2);`, [postId, hashtagId]);
      });

        res.sendStatus(201);
  } catch (err){
    res.status(500).send(err.message);
  }
}

export const getTrendingPosts = async (req, res) => {
  const hashtag = (req.params.hashtag).toLowerCase();
  try{
  const hashtagId = await connectionDb.query(`SELECT id FROM hashtags WHERE name = $1;`, [hashtag]);
  if(hashtagId.rowCount === 0) return res.status(404).send("Hashtag not found");
  const response = await connectionDb.query(`SELECT users.username, users."pictureUrl", posts.*FROM posts
    JOIN users ON posts."userId" = users.id
   JOIN "hashtagPosts" ON posts.id = "hashtagPosts"."postId" WHERE "hashtagPosts"."hashtagId" = $1;`, [hashtagId.rows[0].id]);
  if(response.rowCount === 0) return res.status(404).send("There are no posts with this hashtag yet");
  res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send("An error occurred while trying to fetch the posts, please refresh the page");
  }
};

export const getUserPosts = async (req, res) => {
 const userId = req.params.userId;
  try{
  const response = await connectionDb.query(`SELECT users.username, users."pictureUrl", posts.* FROM posts JOIN  users ON posts."userId" = users.id WHERE posts."userId" = $1 ORDER BY posts."createdAt" DESC;`, [userId]);
  if(response.rowCount === 0) return res.status(404).send("This user has no posts yet");
  res.status(200).send(response.rows);
  } catch (error) {
    res.status(500).send("An error occurred while trying to fetch the posts, please refresh the page");
  }

};