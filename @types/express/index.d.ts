import mongoose from 'mongoose';

declare global{
    namespace Express {
        interface Request {
            userid: mongoose.Schema.Types.ObjectId
        }
    }
}

