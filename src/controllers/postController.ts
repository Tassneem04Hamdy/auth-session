import express from 'express';
import Post from '../models/post';

export const createPost = async (req: express.Request, res: express.Response) => {
    try {

        let post = req.body;
        post.created_by = req.userid;
        post = await Post.create(post);
        return res.status(201).json(post);

    } catch (err: any) {
        return res.status(500).json({
            status: 'error',
            error: err.message,
        });
    }
};

export const getPosts = async (req: express.Request, res: express.Response) => {
    try {

        const posts = await Post.find({ 'created_by': req.userid });
        return res.json(posts);

    } catch (err: any) {
        return res.status(500).json({
            status: 'error',
            error: err.message,
        });
    }
};

