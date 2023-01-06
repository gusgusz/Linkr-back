import { connectionDb } from "../database/db.js";

export default async function findPostIdRepositorie(id) {
    try {
        const postIdFind = await connectionDb.query(`
        SELECT
            users.id , posts.* 
        FROM 
            users JOIN posts 
        ON
            users.id = posts."userId"
        WHERE
            posts.id = $1;`
        , [id]);

        return postIdFind;

    } catch (error) {
      console.log(error);  
    };
};
