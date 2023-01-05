import newUserValidateMiddleware from "../../middlewares/newUserValidate.middleware.js";
import emailVerifyRepositorie from "../../repositories/emailVerify.repositorie.js";
import bcrypt from "bcrypt";
import insertNewUserRepositorie from "../../repositories/insertNewUser.repositorie.js";

export default async function signUpController(req,res) {
    try {
        const user = req.body;

        // verificação se o email já está cadasrado no DB:
        const emailExist = await emailVerifyRepositorie(res , user.email);

        if(emailExist) return res.status(409).send({message:"email já cadastrado"});

        // //inserção do novo usuário no DB:
        const newUser = {
            ...user,
            password: bcrypt.hashSync(user.password, 10)
        };
        
        const userInsert = await insertNewUserRepositorie(res , newUser);

        if(userInsert.rowCount === 1) return res.sendStatus(201);

        res.sendStatus(500);

    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
};
