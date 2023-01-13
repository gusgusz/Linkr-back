import { connectionDb } from "../database/db.js";

export default async function getComents(postId) {
  try {
    const commentsList = await connectionDb.query(`
        SELECT 
            users.id AS "userId" , users.username , users."pictureUrl" , comments.comment , comments."postId"
        FROM
            users JOIN comments
        ON
            users.id = comments."userId"
        WHERE
            comments."postId" = $1; 
    ` , [postId]);

    return commentsList;

  } catch (error) {
    console.log(error);
  };
};
