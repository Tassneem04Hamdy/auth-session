const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { logInValidation } = require('../middlewares/validation');


const signIn = async (req, res) => {

    try {

        //validate data
        const error = logInValidation(req.body);
        if (error) {
            return res.status(400).json({ erroe: error.details[0].message });
        }

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
        const accessTocken = jwt.sign({ id: userFound._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        //send it in response header
        return res.header('auth-token', accessTocken).send("Signed In.");

    } catch (err) {
        res.status(500).json({
            status: "error",
            error: err.message,
        });
    }
};

module.exports = signIn;
