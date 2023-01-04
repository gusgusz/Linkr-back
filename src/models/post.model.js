import joi from "joi";

export const postSchema = joi.object({
    url: joi.string().uri().regex(/^(http(s):\/\/.)[-a-zA-Z0-9@:%.~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%.~#?&//=]*)$/).required(),
    caption: joi.string()
  });