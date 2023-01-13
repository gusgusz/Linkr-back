import { connectionDb } from "../database/db.js";
import { checkFollowRepository } from "../repositories/checkFolow.repositories.js";

export const postFollow = async (req,res)=> {
    const userId = req.params.userId;
    const userLog = res.locals.userId;

    try{
        await connectionDb.query(`INSERT INTO follows("userId", "followId") VALUES ($1,$2);`,[userLog,userId]);

        res.sendStatus(200);

    }catch(error){
        console.log(error)
        res.sendStatus(500);
    }
};

export const deleteFollow = async (req,res)=> {
    const userId = req.params.userId;
    const userLog = res.locals.userId;

    try{
        await connectionDb.query(`DELETE FROM follows WHERE "userId"=$1 AND "followId"=$2;`,[userLog,userId]);

        res.sendStatus(200);

    }catch(error){
        console.log(error)
        res.sendStatus(500);
    }
}

export const getFollowStatus = async (req,res)=> {
    const userId = req.params.userId;
    const userLog = res.locals.userId;

    try{
        
        const status = await checkFollowRepository(res, userId, userLog);

        res.status(200).send({followStatus:status});

    }catch(error){
        console.log(error)
        res.sendStatus(500);
    }
};