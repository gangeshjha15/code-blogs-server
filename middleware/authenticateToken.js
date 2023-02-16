import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const authenticateToken = async (req, res, next)=>{
    const authHeader = req.header('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(token == null){
        return res.status(401).json({msg: 'Token is missing!'});
    }

    jwt.verify(token, process.env.ACCESS_SECRET_KEY, (error, user)=>{
        if(error){
            return res.status(401).json({msg: 'invalid token'});
        }

        req.user = user;

        next();
    })

}