import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    body: {
        type: String,
        required: true
    },
    created_by: {
        type: String
    },
},
    { timestamps: true }
);

const Post = mongoose.model('posts', postSchema);
export default Post;
