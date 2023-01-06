import { connectionDb } from "../../database/db.js";

export const LogOut = async (req, res) => {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    try {

        await connectionDb.query('DELETE FROM tokens WHERE token = $1;' , [token]);
        
        res.sendStatus(200);
        
    } catch (error){
        console.log(error)
        res.status(500).send(error);
    }
}

export default LogOut;