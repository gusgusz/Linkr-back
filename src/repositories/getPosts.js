import { connectionDb} from "../database/db.js";

export const getPostsUser= async(res, userId, followStatus, page)=>{
    try{
        const statusFollow = followStatus;
        let response;
        
        if(statusFollow =="ok"){
            
            response = (await connectionDb.query(
                `SELECT users.username, users."pictureUrl", posts.*, 
                COALESCE(COUNT(likes."postId"),0) AS "numberOfLikes",
                (select count (*) from likes where "postId"=posts.id and "userId"=$1)::int as liked
                 FROM posts 
                 LEFT JOIN users ON posts."userId" = users.id
                 LEFT JOIN likes ON likes."postId" = posts.id
                 JOIN follows ON follows."userId"=$1 WHERE (follows."userId"=$1 AND follows."followId"=users.id) OR users.id=$1
                 GROUP BY users.username, users."pictureUrl", posts.id 
                 ORDER BY posts."createdAt" DESC OFFSET $2 LIMIT 10;`,[userId,(page*10)])).rows;

        } else{
            
            response = (await connectionDb.query(
                `SELECT users.username, users."pictureUrl", posts.*, 
                COALESCE(COUNT(likes."postId"),0) AS "numberOfLikes",
                (select count (*) from likes where "postId"=posts.id and "userId"=$1)::int as liked
                 FROM posts 
                 LEFT JOIN users ON posts."userId" = users.id
                 LEFT JOIN likes ON likes."postId" = posts.id WHERE users.id=$1
                 GROUP BY users.username, users."pictureUrl", posts.id 
                 ORDER BY posts."createdAt" DESC  OFFSET $2 LIMIT 10;`,
                 [userId, (page*10)])).rows;
        }

        return response;
    }catch(error){
        console.log(error)
        res.sendStatus(500)
    }
}