import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser, getUserById, updateUser, getAllUsers as fetchUsers } from '../services/user.service';
import { generateToken, verifyToken } from '../utils/jwt';
import { logger } from '../utils/logger';
import { sendUnifiedResponse } from '../utils/response'; 

export async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, email, password  } = req.body;
    const user = await registerUser(username, email, password);
    sendUnifiedResponse(res, 201, 'User registered successfully', { id: user.id, username: user.username, email: user.email, balance: user.balance });
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
    const user = await getUserById(userId);
    if (!user)
      return sendUnifiedResponse(res, 404, 'User not found');
    sendUnifiedResponse(res, 200, 'User profile fetched', { id: user.id, username: user.username, email: user.email, balance: user.balance });
  } catch (error) {
    logger.error('Error fetching user profile', error);
    next(error);
  }
}

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await fetchUsers();
    sendUnifiedResponse(res, 200, 'Users fetched successfully', users);
  } catch (error) {
    logger.error('Error fetching users', error);
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

export async function update(req: Request, res: Response, next: NextFunction) {
  const { userId } = req.params;
  const { username, email, password, balance } = req.body;
  try {
    // Filter out undefined fields to allow partial updates
    const updateData: any = {};
    if (username !== undefined) updateData.username = username;
    if (email !== undefined) updateData.email = email;
    if (password !== undefined) updateData.password = password;
    if (balance !== undefined) updateData.balance = balance;

    // Assuming updateUser is a function that updates the user in the database
    const updatedUser = await updateUser(userId, updateData);
    if (!updatedUser) {
      return sendUnifiedResponse(res, 404, 'User not found');
    }
    sendUnifiedResponse(res, 200, 'User updated successfully', { id: updatedUser.id, username: updatedUser.username, email: updatedUser.email, balance: updatedUser.balance });
  } catch (error) {
    logger.error('Error updating user', error);
    next(error);
  }
}
