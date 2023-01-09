import { connectionDb } from "../database/db.js";

export async function getUsersBySearch(req, res){
    const username = req.params.username;
    try{
        const users = await connectionDb.query('SELECT * FROM users WHERE users.username LIKE $1;',
        [`${username}%`]
        );
        return res.send(users.rows);

    } catch (err){
        res.status(500).send(err.message);
    }
}