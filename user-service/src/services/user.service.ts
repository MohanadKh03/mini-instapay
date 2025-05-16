import bcrypt from 'bcryptjs';
import { User }  from '../models/user.model';
import { logger } from '../utils/logger';

export async function registerUser(username: string, email: string, password: string) {

      logger.info("REGISTER USER BEGIN")
      logger.info(username, email, password)
  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('User already exists with this username or email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  logger.info(hashedPassword)
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    balance: 0
  });
  logger.info(newUser.username)

  await newUser.save();
  return newUser;
}

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}

export async function getUserById(id: string) {
  const user = await User.findOne({ id });
  if (!user) throw new Error('User not found');
  return user;
}

export async function getAllUsers() {
  const users = await User.find();
  return users.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email,
    balance: user.balance
  }));
}

export async function updateUser(id: string, updates: Partial<User>) {
  return await User.findOneAndUpdate({ id }, updates, { new: true });
}