import { v4 as uuid } from 'uuid';
import { authRepository } from '../../repositories/auth.repository.js';

export default async function signInController(req, res){

    const user = res.locals.user;

    try {

        const token = uuid();
        
        await authRepository.createSession(res, token, user.id);

        return res.status(200).send(token);
    
    } catch (error) {

       return  res.status(500).send(error.message)
    }
}