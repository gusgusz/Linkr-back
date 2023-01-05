import { connectionDb } from "../database/db.js";

async function getLikes(postId, userId) {

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
    
    return message
}

export const likeRepository = {
	getLikes
}