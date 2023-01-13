import { userRepository } from "../repositories/getUser.repository.js";
import insertNewPostRepository from "../repositories/insertNewPost.repository.js";
import { connectionDb } from "../database/db.js";
import urlMetadata from "url-metadata";
import  getTrandings  from "../repositories/getTrandings.repository.js";
import updatePostRepository from "../repositories/updatePostRepositories.js";
import {checkFollowRepository, checkStatusFollow} from "../repositories/checkFolow.repositories.js";
import { getPostsUser } from "../repositories/getPosts.js";
import { getSharesByPostId } from "../repositories/getShares.repository.js";

export const getPosts = async (req, res) => {
  let {page} = req.query;
  if(!page) page = 0;
  page = page * 10;
  console.log(page);

  const userId = res.locals.userId;
  try{
    const hashtags = await getTrandings();
    const followStatus = await checkStatusFollow(res, userId)

    const response = await getPostsUser(res,userId, page, followStatus);
    
    if(response.rowCount === 0) {
      return res.status(404).send("There are no posts yet");
    }
    
    const posts = await Promise.all(response.map(async (post) => {
      const { url } = post;
      const metadata = await urlMetadata(url);
      const { title, description, image } = metadata;
      return { ...post, title, description, image, isRepost: false};
    }));
    
  res.status(200).send({hashtags, posts, followStatus});
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  } 
}

export const postPosts = async (req, res) =>{
  try{
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');

    const userId = await userRepository.getUser(token);

    const {url, caption} = req.body;

    const postId =  await insertNewPostRepository(res, url, caption, userId);

      const hashtags = (caption.match(/#[\w\d]+/g))?.map((hashtag) => {
      return  ((hashtag.replace('#', '')).toLowerCase()).trim();});
    
      if(!hashtags) return res.sendStatus(201);

      const hashtagsId = await Promise.all(hashtags.map(async (hashtag) => {
        const response = await connectionDb.query(`SELECT id FROM hashtags WHERE name = $1;`, [hashtag]);

        if(response.rowCount === 0){
          const response = await connectionDb.query(`INSERT INTO hashtags (name) VALUES ($1) RETURNING id;`, [hashtag]);
          return response.rows[0].id;
        } 
        else {
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
   let {page} = req.query;
  if(!page) page = 0;
 
 
  try{
    const hashtags = await getTrandings();
    const hashtagId = await connectionDb.query(`SELECT id FROM hashtags WHERE name = $1;`, [hashtag]);
  if(hashtagId.rowCount === 0) return res.status(404).send("Hashtag not found");
    const response = (await connectionDb.query(`SELECT users.username, users."pictureUrl", posts.* FROM posts
    JOIN users ON posts."userId" = users.id
    JOIN "hashtagPosts" ON posts.id = "hashtagPosts"."postId" WHERE "hashtagPosts"."hashtagId" = $1 ORDER BY posts."createdAt" DESC  OFFSET $2 LIMIT 10;`, [hashtagId.rows[0].id, page*10])).rows;

    const posts = await Promise.all(response.map(async (post) => {
    const { url } = post;
    const metadata = await urlMetadata(url);
    const { title, description, image } = metadata;
    delete post.createdAt;
    return { ...post, title, description, image };
  }));
  res.status(200).send({hashtags, posts});
  } catch (error) {
   
    res.status(500).send("An error occurred while trying to fetch the posts, please refresh the page");
  }
};

export const getUserPosts = async (req, res) => {
  const userId = req.params.userId;
  const userLog = res.locals.userId ;
 
 const hashtags = await getTrandings();
  let {page} = req.query;
  if(!page) page = 0;
 
  try{
    const response = (await connectionDb.query(`SELECT users.username, users."pictureUrl", posts.* FROM posts JOIN  users ON posts."userId" = users.id WHERE posts."userId" = $1 ORDER BY posts."createdAt" DESC OFFSET $2 LIMIT 10;`, [userId, page*10])).rows;
    

   
    const userFollow = await checkFollowRepository(res, userId, userLog);

    const posts = await Promise.all(response.map(async (post) => {
    const { url } = post;
    const metadata = await urlMetadata(url);
    const { title, description, image } = metadata;
    delete post.createdAt;
    return { ...post, title, description, image };
  }));
  console.log({hashtags, posts,userFollow})
  res.status(200).send({hashtags, posts,userFollow});
  } catch (error) {
    res.status(500).send("An error occurred while trying to fetch the posts, please refresh the page");
  }

};

export const updateUserPost = async (req, res) =>{
  try{
    const { id, caption } = req.body;

      await updatePostRepository(res, id, caption);

      
      const hashtags = (caption.match(/#[\w\d]+/g)).map((hashtag) => {
      return  ((hashtag.replace('#', '')).toLowerCase()).trim();});
      
      const hashtagsId = await Promise.all(hashtags.map(async (hashtag) => {

        const response = await connectionDb.query(`SELECT id FROM "hashtags" WHERE name = $1;`, [hashtag]);

        if(response.rowCount === 0){

          const res = await connectionDb.query(`INSERT INTO "hashtags" (name) VALUES ($1) RETURNING id;`, [hashtag]);

          return res.rows[0].id;
        } else {
          const hasthtagPosts = await connectionDb.query(`SELECT * FROM "hashtagPosts" WHERE "hashtagId" = $1;`, [response.rows[0].id]);
          
          if(hasthtagPosts.rows.length === 1 && hasthtagPosts.rows[0].postId === id){

            await connectionDb.query(`DELETE FROM "hashtagPosts" WHERE "postId"=$1;`,[id])

            if(hasthtagPosts.rows[0].hashtagId !=response.rows[0].id){
              
              await connectionDb.query(`DELETE FROM "hashtags" WHERE name = $1;`, [hashtag])
            }
            return;
          } else{
            return response.rows[0].id;
          }
        }
      }));

      hashtagsId.map(async (hashtagId) => {
        if(hashtagId){
          await connectionDb.query(`INSERT INTO "hashtagPosts" ("postId", "hashtagId") VALUES ($1, $2);`, [id, hashtagId]);
        }
      });

      return res.status(201).send(caption);
  } catch (err){
    console.log("COntroller:",err)
    return res.status(500).send(err.message);
  }
}

