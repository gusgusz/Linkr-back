import { connectionDb } from "../database/db.js";

async function getMessageLikes(postId, userId) {
    let message = ''
    const getCount = await connectionDb.query(
        `SELECT COALESCE(COUNT("userId")) AS "numberOfLikes" FROM "public"."likes" WHERE "postId"=$1;`,
        [postId]
    );
    if (getCount.rows[0].numberOfLikes === "0"){
        return {message: 'Nenhuma curtida'}
    }
    const listOfLikes = await connectionDb.query(
        `SELECT "username" FROM "public"."likes" 
        JOIN "users" ON "likes"."userId" = users.id 
        WHERE "postId"=$1 AND "userId" <> $2 `,
        [postId, userId]
    );
    
    const arrayOfNames = listOfLikes.rows;

    if (arrayOfNames.length !== Number(getCount.rows[0].numberOfLikes)){
        switch(arrayOfNames.length){
            case (2):
                message = `Você, ${arrayOfNames[0].username} e outra 1 pessoa`
                break
            case (1):
                message = `Você e ${arrayOfNames[0].username} curtiram`
                break
            case (0):
                message = `Você curtiu`
                break
            default:
                message = `Você, ${arrayOfNames[0].username} e outras ${arrayOfNames.length-1} pessoas`
        }
        
    } else {
        switch(arrayOfNames.length){
            case (3):
                message = `${arrayOfNames[0].username}, ${arrayOfNames[1].username} e outra 1 pessoa`
                break
            case (2):
                message  = `${arrayOfNames[0].username} e ${arrayOfNames[1].username} curtiram`
                break
            case (1):
                message = `${arrayOfNames[0].username} curtiu`
                break
            default:
                message = `${arrayOfNames[0].username}, ${arrayOfNames[1].username} e outras ${arrayOfNames.length-2} pessoas`
        } 
    }
    
    //return {numberOfLikes: getCount.rows[0].numberOfLikes, message}
    return {message}
}

async function createLike(postId, userId){

    return await connectionDb.query(`INSERT INTO likes ("userId", "postId") VALUES ($1, $2);`, [userId, postId]);

}

async function deleteLike(postId, userId){

    return await connectionDb.query(`DELETE FROM likes WHERE "userId"=$1 AND "postId"=$2;`, [userId, postId]);

}

const likeRepository = {
    createLike,
    deleteLike,
    getMessageLikes
};

export default likeRepository;

/* SELECT users.username, users."pictureUrl", posts.*, COALESCE(COUNT("userId")) AS "numberOfLikes" FROM posts JOIN users ON posts."userId" = users.id JOIN likes ON likes."postId" = posts.id GROUP BY users.username, users."pictureUrl", posts.id ORDER BY posts."createdAt" DESC;
 */
//INSERT INTO likes ("userId", "postId") VALUES (2, 19)
