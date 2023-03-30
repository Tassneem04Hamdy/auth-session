import express from "express";
import validateToken from '../middleWares/validateToken';
import { createPost, getPosts } from '../controllers/postController';

const router = express.Router();

router.post("/posts", validateToken, createPost);
router.get("/posts", validateToken, getPosts);

export default router;
