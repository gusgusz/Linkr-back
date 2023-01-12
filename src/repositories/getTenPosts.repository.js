import { connectionDb } from "../database/db.js";

export default async function getTenPosts(){
    const response = (await connectionDb.query(
        `SELECT users.username, users."pictureUrl", posts.*, 
        COALESCE(COUNT(likes."postId"),0) AS "numberOfLikes"
         FROM posts 
         LEFT JOIN users ON posts."userId" = users.id 
         LEFT JOIN likes ON likes."postId" = posts.id
         GROUP BY users.username, users."pictureUrl", posts.id 
         ORDER BY posts."createdAt" DESC;`
    
      /* `SELECT users.username, users."pictureUrl", posts.* FROM posts JOIN users ON posts."userId" = users.id 
        ORDER BY posts."createdAt" DESC;`   */
    
        )).rows;

    return response;
}

