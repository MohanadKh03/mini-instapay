import express from 'express';
import { sendMoney, getAllUserTransactions, getTransactionById, getAllTransactions } from '../controllers/transaction.controller';

const router = express.Router();

router.post('/send-money', sendMoney)
router.get('/user/:userId', getAllUserTransactions);
router.get('/all', getAllTransactions);
router.get('/:transactionId', getTransactionById);

export default router;
