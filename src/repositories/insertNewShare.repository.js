import { connectionDb } from "../database/db.js";

export default async function insertNewShareRepository(postId, userId) {
    const now = new Date();
    await connectionDb.query('INSERT INTO "shares" ("postId", "userId", "createdAt") VALUES ($1, $2, $3) RETURNING id;',
        [postId, userId, now])
};
