import newUserSchema from "../models/newUser.model.js";

export default function newUserValidateMiddleware(user) {

    const validate = newUserSchema.validate(user , {abortEarly:false});


    if(validate.error){
        const errorsList = validate.error.details.map(d => d.message);
        return {errorsList};
    };

    return true;
};
