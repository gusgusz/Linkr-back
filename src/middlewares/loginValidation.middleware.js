import bcrypt from 'bcrypt';
import { authRepository } from '../repositories/auth.repository.js';


export default async function loginValidation(req, res, next){

    const user = req.body;

    try {
        const userExist = await authRepository.emailVerify(res, user.email);

        if(!userExist || !bcrypt.compareSync(user.password, userExist.rows[0].password)) return res.status(401).send("email ou senha incorreto");

        res.locals.user = userExist.rows[0];

        next();

    } catch (error) {

         res.status(500).send(error.message);
    }

}