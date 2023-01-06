import { connectionDb } from "../database/db.js";
import findPostIdRepositorie from "../repositories/findPostId.repositorie.js";

export default async function postIdAuthenticationMiddleware(req,res,next) {
    try {
        const {id} = req.params;

        const userId = res.locals.userId;

        const findIdPostUser = await findPostIdRepositorie(id);

        if(findIdPostUser.rows.length === 0) return res.sendStatus(404);

        if(findIdPostUser.rows[0].userId !== userId) return res.sendStatus(401);

        next();

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    };
};
