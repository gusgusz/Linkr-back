import { connectionDb } from "../database/db.js";
import { userRepository } from "../repositories/getUser.repository.js";
import insertNewShareRepository from "../repositories/insertNewShare.repository.js";


export const postShare = async (req, res) => {

    try{

    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
      
    const userId = await userRepository.getUser(token);
    
    const postId = req.params.postId

    const response = await insertNewShareRepository(res, postId, userId)

      res.sendStatus(201);
    } catch (error) {
      res.send(error.message)
    } 
  }

export const getShares = async (req, res) => {

  try{

  /*   const response = (await connectionDb.query(
      `SELECT "userOriginal".username, "userOriginal"."pictureUrl", posts.*,
      COALESCE("userShare".username, 'notShared') AS "repostUsername",
      COALESCE(COUNT(likes."postId"),0) AS "numberOfLikes",
      COALESCE(COUNT(shares."postId"),0) AS "numberOfShares",
      COALESCE(COUNT(comments."postId"),0) AS "numberOfComments"
       FROM posts 
       LEFT JOIN users "userOriginal" ON posts."userId" = "userOriginal".id
       LEFT JOIN shares ON shares."postId" = posts.id
       LEFT JOIN users "userShare" ON shares."userId" = "userShare".id
       LEFT JOIN likes ON likes."postId" = posts.id
       LEFT JOIN comments ON comments."postId" = posts.id
       GROUP BY "userOriginal".username, "userOriginal"."pictureUrl", posts.id, "userShare".username;
       ;` */
      const response = (await connectionDb.query(
      `SELECT users.username AS "repostUsername", posts.id AS "postId"
       FROM posts 
       JOIN shares ON shares."postId" = posts.id
       JOIN users ON shares."userId" = users.id;
       ` 
       /* const response = (await connectionDb.query(

         `SELECT
             COALESCE(COUNT(shares."postId"),0) AS "numberOfShares"
             FROM posts 
             LEFT JOIN shares ON shares."postId" = posts.id
             WHERE posts.id = $1
             GROUP BY posts.id;
             `, [postId] */
    
      )).rows;
      


      res.status(200).send(response);
      //res.status(200).send("Repost success!");
    } catch (error) {
      res.send(error.message)
    } 
}



       