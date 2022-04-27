import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
    { timestamps: true }
);

const Post = mongoose.model('posts', postSchema);
export default Post;
