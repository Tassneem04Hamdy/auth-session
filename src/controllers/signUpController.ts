import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/user';

const signUp = async (req: express.Request, res: express.Response) => {
    try {

        //check if this email is already used
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.status(400).json({ error: 'Email already exists.' });
        }

        //create new user
        const user = req.body;

        //const newUser = await User.create(user);

        /* const salt = await bycrypt.genSalt(10);
        const hashedPass = await bycrypt.hash(req.body.password,salt); */
        const hashedPass = await bcrypt.hash(req.body.password, 10);

        user.password = hashedPass;
        const newUser = await User.create(user);

        return res.status(201).json("Signed Up.");

    } catch (err: any) {
        res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
};

export default signUp;
