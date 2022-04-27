import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';


const signIn = async (req: express.Request, res: express.Response) => {

    try {

        //check if user found in db
        const userFound = await User.findOne({ email: req.body.email });
        if (!userFound) {
            return res.status(400).json({ error: 'Email not found.' });
        }

        //compare entered pass with hashed one in db
        const validPass = await bcrypt.compare(req.body.password, userFound.password);
        if (!validPass) {
            return res.status(400).json({ error: 'Wrong password.' });
        }

        //generate token containing user ID
        const secret = process.env.ACCESS_TOKEN_SECRET || '';
        const accessTocken = jwt.sign({ id: userFound._id }, secret, { expiresIn: '60s' });
        //send it in response header
        return res.header('auth-token', accessTocken).send("Signed In.");

    } catch (err: any) {
        res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
};

export default signIn;
