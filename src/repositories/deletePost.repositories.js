import { connectionDb } from "../database/db.js";

export default async function deletePostRepositories(id) {
    try {
        const deletedLikes = await connectionDb.query('DELETE FROM likes WHERE "postId" = $1;' , [id]);

        const deletedPost = await connectionDb.query('DELETE FROM posts WHERE id = $1;' , [id]);

        return deletedPost.rowCount;

    } catch (error) {
        console.log(error);
    };
};
