import bcrypt from 'bcryptjs';
import { User }  from '../models/user.model';


export async function registerUser(username: string, email: string, password: string) {
  // Check if user already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new Error('User already exists with this username or email');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    balance: 0
  });

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
  return await User.findOne({ id });
}
