import addComment from "../../repositories/addComment.js";

export default async function commentController(req , res) {
    try {
        const {postId} = req.params;
        const userId = res.locals.userId;
        const {comment} = req.headers;

        const commentInfo = {
          postId,
          userId,
          comment
        };

        const publishedComment = await addComment(res , commentInfo);

        if(publishedComment.rowCount < 1) return res.sendStatus(400);

        res.sendStatus(201);

    } catch (error) {
      console.log(error);
      res.sendStatus(500);  
    };
};
