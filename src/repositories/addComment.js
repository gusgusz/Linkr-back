import { connectionDb } from "../database/db.js";

export default async function addComment(res , commentInfo) {
    try {

        const {userId , postId ,comment} = commentInfo;

        const publishedComment = await connectionDb.query('INSERT INTO comments ("userId" , "postId" , comment) VALUES ($1 ,$2 ,$3);' , [userId , postId , comment]);

        return publishedComment;

    } catch (error) {
        console.log(error.message);
        res.sendStatus(500);
        return 0;
    };
};
