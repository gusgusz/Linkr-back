import { connectionDb } from "../database/db.js";

export default async function insertNewPostRepository(res, url, caption, userId) {
    const now = new Date();
    try {
       const postId = await connectionDb.query('INSERT INTO "posts" ("url", "caption", "userId", "createdAt") VALUES ($1, $2, $3,$4) RETURNING id;',
        [url, caption, userId, now]
        );

        return (postId.rows[0].id);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};
