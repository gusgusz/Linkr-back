import { likeRepository } from "../repositories/getLikes.repository.js";
import { userRepository } from "../repositories/getUser.repository.js";

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