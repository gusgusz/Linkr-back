import { signInSchema } from "../models/signIn.model.js";

export default function signInSchemaValidation(req, res, next){

    const user = req.body;

    const validation = signInSchema.validate(user, { abortEarly: false});

    if(validation.error){
        const errors = validation.error.details.map(e => e.message); 

        return res.status(500).send(errors);
    }

    next();

}