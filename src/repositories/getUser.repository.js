import { connectionDb } from "../database/db.js";

async function getUser(token) {

    const tokenExists = await connectionDb.query(
        'SELECT * FROM tokens WHERE token=$1;',
        [token]
    );
    
    const {userId} = tokenExists.rows[0];
    
    return userId
}

export const userRepository = {
	getUser
}