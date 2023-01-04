import { connectionDb } from "../database/db.js";

async function emailVerify(res , email) {
    try {
        const emailRegistered = await connectionDb.query("SELECT * FROM users WHERE email = $1;" , [email]);

        if(emailRegistered.rows.length > 0) return emailRegistered;

        return false;

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

async function insertNewUser(res,newUser) {
    try {
        await connectionDb.query('INSERT INTO users (username , email ,  password, "pictureUrl" ) VALUES ($1 , $2 , $3 , $4);' , [newUser.username, newUser.email, newUser.password, newUser.pictureUrl]);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
}

async function createSession(res, token, id){
    try {
        
        await connectionDb.query('INSERT INTO tokens (token, "userId") VALUES ($1, $2);', [token, id]);

    } catch (error) {
        
        res.status(500).send(error.message);
    }
}

export const authRepository = {
    emailVerify,
    insertNewUser,
    createSession
}