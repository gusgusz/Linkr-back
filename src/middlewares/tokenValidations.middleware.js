import { connectionDb } from "../database/db.js";
import { tokenSchema } from "../models/token.model.js";

export async function tokenValidation(req, res, next) {
  const { authorization } = req.headers;
  if (!authorization){
    return res
        .status(401)
        .send({ message: "Você precisa enviar um header válido!" });
  }
  const tokenObject = {
    authorization
  }
  const { error } = tokenSchema.validate(tokenObject, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(401).send(errors);
  }
  
  const token = authorization.replace('Bearer ', '');
  

  const sessionExists = await connectionDb.query(
      'SELECT * FROM tokens WHERE token=$1;',
      [token]
  );

  if (!sessionExists.rows[0]) {
      return res
        .status(401)
        .send({ message: "Essa sessão não existe!" });
    }

  next()
}