import { postSchema } from "../models/post.model.js";

export async function postBodyValidation(req, res, next) {
    const post = req.body;
    const { error } = postSchema.validate(post, { abortEarly: false });
  
    if (error) {
      console.log(error)
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send(errors);
    }
  
    next()
  }