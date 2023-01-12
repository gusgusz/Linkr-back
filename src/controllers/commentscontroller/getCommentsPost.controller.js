import getComents from "../../repositories/getComents.js";

export default async function getCommentsPostController(req , res) {
    try {
        const {postId} = req.params;

        const commentsList = await getComents(postId);

        if(commentsList.rows === 0) return res.sendStatus(404);

        res.status(200).send(commentsList.rows);

    } catch (error) {
        console.log(error);
    };
};
