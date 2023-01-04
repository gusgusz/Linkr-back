import { connectionDb } from "../database/db.js";

export default async function emailVerifyRepositorie(email) {
    try {
        const emailRegistered = await connectionDb.query("SELECT * FROM users WHERE email = $1;" , [email]);

        if(emailRegistered.rows.length > 0) return true;

        return false;

    } catch (error) {
        console.log(error);
    }
};
