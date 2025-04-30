import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, getUserById } from '../services/user.service';
import { generateToken, verifyToken } from '../utils/jwt';
import { logger } from '../utils/logger';
import { sendUnifiedResponse } from '../utils/response'; 

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password  } = req.body;
    const user = await registerUser(username, email, password);
    sendUnifiedResponse(res, 201, 'User registered successfully', { id: user.id, username: user.username, email: user.email });
  } catch (error) {
    logger.error('Error during user registration', error);
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);

    if (!user)
      return sendUnifiedResponse(res, 401, 'Invalid credentials');

    const token = generateToken({ id: user.id, username: user.username });
    sendUnifiedResponse(res, 200, 'Login successful', { token });
  } catch (error) {
    logger.error('Error during login', error);
    next(error); 
  }
}

// Get user profile
export async function profile(req: Request, res: Response, next: NextFunction) {
  try {
    const userId = req.params.userId;
    const user = getUserById(userId);
    if (!user)
      return sendUnifiedResponse(res, 404, 'User not found');
    sendUnifiedResponse(res, 200, 'User profile fetched', { id: user.id, username: user.username, email: user.email });
  } catch (error) {
    logger.error('Error fetching user profile', error);
    next(error);
  }
}

export function verify(req: Request, res: Response, next: NextFunction) {
  const { token } = req.body;
  try {
    const payload = verifyToken(token);
    sendUnifiedResponse(res, 200, 'Token verified', { payload });
  } catch (error) {
    sendUnifiedResponse(res, 400, 'Token verification failed');
  }
}
