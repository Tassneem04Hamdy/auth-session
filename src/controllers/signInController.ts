import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { logInValidation } from '../middleWares/dataValidation';


const signIn = async (req: express.Request, res: express.Response) => {

    try {

        // validate data
        const error = logInValidation(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        // check if user found in db
        const userFound = await User.findOne({ email: req.body.email });
        if (!userFound) {
            return res.status(401).json({ error: 'Email not found.' });
        }

        // compare entered pass with hashed one in db
        // const validPass = (req.body.password === userFound.password);
        const validPass = await bcrypt.compare(req.body.password, userFound.password);
        if (!validPass) {
            return res.status(401).json({ error: 'Wrong password.' });
        }

        // return res.json(userFound);

        // generate token containing user ID
        const secret = process.env.ACCESS_TOKEN_SECRET || '';
        const accessToken = jwt.sign({ username: userFound.name }, secret);
        // send it in response header
        return res.header('auth-token', accessToken).send("Signed In.");

    } catch (err: any) {
        res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
};

export default signIn;
