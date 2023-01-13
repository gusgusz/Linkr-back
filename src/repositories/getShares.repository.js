import { connectionDb} from "../database/db.js";

export const getSharesByPostId= async(res, postId)=>{
    try{
        const response = connectionDb.query(
            `SELECT
             COALESCE(COUNT(shares."postId"),0) AS "numberOfShares"
             FROM posts 
             LEFT JOIN shares ON shares."postId" = posts.id
             WHERE posts.id = $1
             GROUP BY posts.id;
             `, [postId]
    
    
             /* `SELECT users.username, users."pictureUrl", posts.*,
             COALESCE(COUNT(likes."postId"),0) AS "numberOfLikes",
             COALESCE(COUNT(shares."postId"),0) AS "numberOfShares",
             COALESCE(COUNT(comments."postId"),0) AS "numberOfComments"
             FROM posts 
             LEFT JOIN users ON posts."userId" = users.id
             JOIN shares ON shares."postId" = posts.id
             LEFT JOIN likes ON likes."postId" = posts.id
             LEFT JOIN comments ON comments."postId" = posts.id
             GROUP BY users.id, posts.id;
             ` */
          );

        return response.rows[0]
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}