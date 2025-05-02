import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

export interface Transaction {
    id: string;
    from_id: string;
    to_id: string;
    status: string; // 'success', 'failed'
    amount: number; 
}
  
// Define the Transaction schema
const transactionSchema = new Schema({
    id: { type: String, default: uuidv4 },
    from_id: { type: String, required: true },
    to_id: { type: String, required: true },
    status: { type: String, required: true, enum: ['success', 'failed'] },
    amount: { type: Number, required: true }
});
  
export const Transaction = model('Transaction', transactionSchema);
  