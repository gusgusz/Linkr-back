import { connectionDb } from "../database/db.js";

async function getMessageLikes(postId, userId) {

    const getCount = await connectionDb.query(
        `SELECT count("userId") AS "numberOfLikes" FROM "public"."likes" WHERE "postId"=$1;`,
        [postId]
    );
    if (getCount.rows[0].numberOfLikes === 0){
        return '0 likes'
    }
    const listOfLikes = await connectionDb.query(
        `SELECT "username", "userId" FROM "public"."likes" 
        JOIN "users" ON "likes"."userId" = users.id 
        WHERE "postId"=$1 AND "userId" <> $2 
        ORDER BY "username" ASC;`,
        [postId, userId]
    );
    
    const arrayOfNames = listOfLikes.rows[0];
    
    if (arrayOfNames.length !== getCount.rows[0]){
        message = `Você, ${arrayOfNames[0]} e outras ${arrayOfNames.length-1} pessoas`
    } else {
        message = `${arrayOfNames[0]}, ${arrayOfNames[1]} e outras ${arrayOfNames.length-2} pessoas`
    }

    return message
}

export const likeRepository = {
	getMessageLikes
}

/* SELECT users.username, users."pictureUrl", posts.*, count(likes."postId") AS "numberOfLikes" FROM posts JOIN users ON posts."userId" = users.id JOIN likes ON likes."postId" = posts.id GROUP BY users.username, users."pictureUrl", posts.id ORDER BY posts."createdAt" DESC;
 */
//INSERT INTO likes ("userId", "postId") VALUES (2, 19)