import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import authRoutes from './routes/authRoutes';
import postRoutes from './routes/postRoutes';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGOURI || '';

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(authRoutes);
app.use(postRoutes);

(async function () {

    try {

        // connect to mongodb
        mongoose.connect(mongoURI)
            .then(() => {
                app.listen(port, () => {
                    console.log('connected to database');
                    console.log(`server is running on port ${port}`);
                });
            })
            .catch(err => {
                console.error('failed to connect to mongodb:\n', err);
                process.exit(1);
            });
    } catch (error) {
        console.log(`Error! ${error}`);
        process.exit(1);
    }
})()