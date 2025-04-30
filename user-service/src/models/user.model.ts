import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface User {
    id: string;
    username: string;
    password: string;
    email: string;
    balance: number;
  }
  
  // Define the User schema
  const userSchema = new Schema({
    id: { type: String, default: uuidv4 },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    balance: { type: Number, default: 0 }
  });
  
  // Create the User model
  export const User = model('User', userSchema);
  