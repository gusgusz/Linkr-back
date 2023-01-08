import likeRepository from "../repositories/getLikes.repository.js";

export async function create(req, res){

    const userId = res.locals.userId;
    const postId = req.body.postId;

    try {

        await likeRepository.createLike(postId, userId);

        res.sendStatus(201);
        
    } catch (error) {
        
        res.status(500).send(error.message);
    }
}

export async function deleteLike(req, res){

    const userId = res.locals.userId;
    const postId = req.body.postId;

    try {
        
        await likeRepository.deleteLike(postId, userId);

        res.sendStatus(200);

    } catch (error) {

        res.status(500).send(error.message);
    }

}