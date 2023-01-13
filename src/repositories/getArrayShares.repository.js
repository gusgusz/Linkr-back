import { connectionDb } from "../database/db.js";

export default async function getSharesArray(){
        
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
       const response = await connectionDb.query(
        `SELECT users.username AS "repostUsername", posts.id AS "postId"
         FROM posts 
         JOIN shares ON shares."postId" = posts.id
         JOIN users ON shares."userId" = users.id;
         `
        );
        
        return response.rows;

    }
