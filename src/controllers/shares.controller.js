import urlMetadata from "url-metadata";
import { checkStatusFollow } from "../repositories/checkFolow.repositories.js";
import getSharesArray from "../repositories/getArrayShares.repository.js";
import { getRepostsUser } from "../repositories/getReposts.repository.js";
import { userRepository } from "../repositories/getUser.repository.js";
import insertNewShareRepository from "../repositories/insertNewShare.repository.js";


export const postShare = async (req, res) => {

    try{

    const { authorization } = req.headers;
    const token = authorization.replace('Bearer ', '');
      
    const userId = await userRepository.getUser(token);
    
    const postId = req.params.postId;

    await insertNewShareRepository(postId, userId);

      res.sendStatus(201);
    } catch (error) {
      res.send(error.message)
    } 
  }



export const getAllShares = async (req, res) =>{
  try{
    const repostsUsernames = await getSharesArray()
    const userId = 9;
    const followStatus = await checkStatusFollow(res, userId)


    const response = await getRepostsUser(res,userId, followStatus);
    
    const reposts = await Promise.all(response.map(async (post) => {
      const { url } = post;
      const metadata = await urlMetadata(url);
      const { title, description, image } = metadata;
      return { ...post, title, description, image, isRepost: true};
    }));

  res.status(200).send({repostsUsernames, reposts, followStatus});
  } catch (err) {

    res.send(err.message)
  } 
}