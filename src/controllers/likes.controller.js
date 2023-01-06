import likeRepository from "../repositories/getLikes.repository.js";

export async function create(req, res){

    const userId = res.locals.userId;
    const postId = req.body.cardId;

    try {

        await likeRepository.createLike(postId, userId);

        res.sendStatus(201);
        
    } catch (error) {
        
        res.status(500).send(error.message);
    }
}

export async function deleteLike(req, res){

    const userId = res.locals.userId;
    const postId = req.body.cardId;

    try {
        
        await likeRepository.deleteLike(postId, userId);

        req.status(200);

    } catch (error) {

        res.status(500).send(error.message);
    }

}