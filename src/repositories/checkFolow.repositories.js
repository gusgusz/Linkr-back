import { connectionDb } from "../database/db.js";

export const checkFollowRepository = async (res,userId, userLog) =>{
    try {
        
        const userFollow = (await connectionDb.query(`SELECT * FROM follows WHERE "userId"=$1 AND "followId"=$2;`, [userLog,userId])).rows[0];

        if(userFollow){
          return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    };
};

export const checkStatusFollow = async (res,userId)=>{

    try{
        const userFollow = (await connectionDb.query(`SELECT * FROM follows WHERE "userId"=$1;`, [userId])).rows[0];

        if (!userFollow){
            return "no-follow";
        }

        const followsPost = (await connectionDb.query(`SELECT posts."userId" FROM posts JOIN follows ON follows."userId"=$1 WHERE follows."userId"=$1 AND follows."followId"=posts."userId";`, [userId])).rows[0];

        if(!followsPost){
            return "no-post";
        } else{
            return "ok"
        }


    }catch(error){
        console.log(error)
        return res.sendStatus(500)
    }
}