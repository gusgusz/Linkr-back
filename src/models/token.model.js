import joi from "joi";

export const tokenSchema = joi.object({
    authorization: joi.string().required().regex(/^Bearer ((?:\.?(?:[A-Za-z0-9-_]+)){3})$/),
  });