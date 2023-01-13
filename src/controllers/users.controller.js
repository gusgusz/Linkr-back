import { connectionDb } from "../database/db.js";

export async function getUsersBySearch(req, res){

    const username = req.params.username;
    const userId = res.locals.userId;

    try{

        const followedUsers = await connectionDb.query(`select distinct u.id , u.* from users u join follows on follows."followId" = u.id
        join users us on follows."userId" = us.id
        where u.username like $1 and us.id = $2;`, [`${username}%`,userId]);

        const OtherUsers = await connectionDb.query(`select u.* from users u where u.username like $1 and u.id not in
        (select distinct u.id from users u join follows on follows."followId" = u.id
                join users us on follows."userId" = us.id
                where u.username like $1 and us.id = $2);`,
        [`${username}%`, userId]);

        console.log(followedUsers, OtherUsers);

        return res.send({followedUsers: followedUsers.rows, OtherUsers: OtherUsers.rows});

    } catch (err){
        res.status(500).send(err.message);
    }
}