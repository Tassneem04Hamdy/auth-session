import express from 'express';
import jwt from 'jsonwebtoken';


const validateToken = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const authHeader = req.headers.authorization;
    //authHeader = "Bearer token"
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json('Access denied.');
    }

    const secret = process.env.ACCESS_TOKEN_SECRET || '';
    jwt.verify(token, secret, (err, payload: any) => {
        if (err) {
            return res.status(401).json('Access denied.');
        }

        //insert user ID into request
        req.username = payload.username;
        next();
    });
};

export default validateToken;
