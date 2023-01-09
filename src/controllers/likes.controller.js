import likeRepository from "../repositories/getLikes.repository.js";
import { userRepository } from "../repositories/getUser.repository.js";

export async function create(req, res){

    const userId = res.locals.userId;
    const postId = req.params.id;

    try {

        await likeRepository.createLike(postId, userId);

        res.sendStatus(201);
        
    } catch (error) {
        
        res.status(500).send(error.message);
    }
}

export async function deleteLike(req, res){

    const userId = res.locals.userId;
    const postId = req.params.id;

    try {
        
        await likeRepository.deleteLike(postId, userId);

        res.sendStatus(200);

    } catch (error) {

        res.status(500).send(error.message);
    }
}

export const getLikes = async (req, res) => {
  
    try{
    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
    
    const userId = await userRepository.getUser(token); 
    const postId = req.params.postId;
 
    const likes = await likeRepository.getMessageLikes(postId, userId)

    res.status(200).send({messageLikes: likes.message});

    } catch (err) {
      res.status(500).send(err.message);
  }
}