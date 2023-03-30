import express from 'express';
import signUp from '../controllers/signUpController';
import signIn from '../controllers/signInController';

const router = express.Router();

router.post('/signUp', signUp);
router.post('/signIn', signIn);

export default router;
