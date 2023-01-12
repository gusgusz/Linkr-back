import { connectionDb } from "../database/db.js";

export default async function insertNewShareRepository(res, postId, userId) {
    const now = new Date();
    try {
       const response = await connectionDb.query('INSERT INTO "shares" ("postId", "userId", "createdAt") VALUES ($1, $2, $3) RETURNING id;',
        [postId, userId, now]
        );

        return (response.rows);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};
