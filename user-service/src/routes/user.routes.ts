import express from 'express';
import { register, login, profile, verify, update, getAllUsers } from '../controllers/user.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile/:userId', profile);
router.get('/all', getAllUsers);
router.post('/verify', verify);
router.put('/update/:userId', update)

export default router;
