import newUserSchema from "../models/newUser.model.js";

export default function newUserValidateMiddleware(req,res,next) {
    try {
        const user = req.body;

        const validation = newUserSchema.validate(user , {abortEarly:false});

        if(validation.error){
            const errorsList = validation.error.details.map(d => d.message); 

            return res.status(400).send(errorsList);
        };

        next();

    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
};
