import bcrypt from 'bcryptjs';
import { User, users } from '../models/user.model';
import { v4 as uuidv4 } from 'uuid';

export async function registerUser(username: string, email: string, password: string) {

  // Check if user already exists
  const existingUser = users.find(user => user.username === username || user.email === email);

  if (existingUser) {
    throw new Error('User already exists with this username or email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: uuidv4(),
    username,
    email,
    password: hashedPassword,
    balance: 0
  };
  users.push(newUser);
  return newUser;
}

export async function loginUser(email: string, password: string) {
  const user = users.find(u => u.email === email);
  if (!user) return null;

  const isValid = await bcrypt.compare(password, user.password);
  return isValid ? user : null;
}

export function getUserById(id: string) {
  return users.find(u => u.id === id);
}
