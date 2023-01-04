import { connectionDb } from "../database/db.js";

export default async function emailVerifyRepositorie(res , email) {
    try {
        const emailRegistered = await connectionDb.query("SELECT * FROM users WHERE email = $1;" , [email]);

        if(emailRegistered.rows.length > 0) return emailRegistered;

        return false;

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
