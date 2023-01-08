import { connectionDb } from "../database/db.js";

export default async function insertNewPostRepository(res, url, caption, userId) {
    try {
       const postId = await connectionDb.query('INSERT INTO "posts" ("url", "caption", "userId") VALUES ($1, $2, $3) RETURNING id;',
        [url, caption, userId]
        );

        return (postId.rows[0].id);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};
