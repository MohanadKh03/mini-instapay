import express from 'express';
import { register, login, profile, verify } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:userId', profile);
router.post('/verify', verify);

export default router;
