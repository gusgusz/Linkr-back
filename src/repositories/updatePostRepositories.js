import { connectionDb } from "../database/db.js";

export default async function updatePostRepository(res, id, caption) {
    try {
        
       await connectionDb.query(`UPDATE posts SET caption=$1 WHERE id=$2;`,
        [caption, id]
        );
        
        return;
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};
