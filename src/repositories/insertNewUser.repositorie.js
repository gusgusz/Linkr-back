import { connectionDb } from "../database/db.js";

export default async function insertNewUserRepositorie(res , newUser) {
    try {
        const userInsert = await connectionDb.query('INSERT INTO users (username , email ,  password, "pictureUrl" ) VALUES ($1 , $2 , $3 , $4);' , [newUser.username, newUser.email, newUser.password, newUser.pictureUrl]);

        return userInsert;

    } catch (error) {
        console.log(error);
        res.status(503).send(error.message);
    };
};
