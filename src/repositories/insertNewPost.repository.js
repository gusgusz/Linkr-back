import { connectionDb } from "../database/db.js";

export default async function insertNewPostRepository(res, url, caption, userId) {
    try {
        await connectionDb.query('INSERT INTO "posts" ("url", "caption", "userId") VALUES ($1, $2, $3);',
        [url, caption, userId]
        );
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};
