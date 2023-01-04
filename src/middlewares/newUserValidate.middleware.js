import newUserSchema from "../models/newUser.schema.js";

export default function newUserValidateMiddleware(req,res,next) {

    const validate = newUserSchema.validate(req.body , {abortEarly:false});

    if(validate.error){
        const errorsList = validate.error.details.map(d => d.message);
        return res.status(400).send({errorsList});
    };

    next();
};
