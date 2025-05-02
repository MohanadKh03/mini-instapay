import { Request, Response, NextFunction } from 'express';
import { makeTransaction, getTransactionById as fetchTransactionById, getTransactionsByUserId, 
    getAllTransactions as fetchAllTransactions } from '../services/transaction.service';
import { sendUnifiedResponse } from '../utils/response';
import { logger } from '../utils/logger';

// Controller to handle sending money
export async function sendMoney(req: Request, res: Response, next: NextFunction) {
  try {
    const { from_id, to_id, amount } = req.body;

    if (!from_id || !to_id || !amount) {
      return sendUnifiedResponse(res, 400, 'Missing required fields');
    }

    const transaction = await makeTransaction(from_id, to_id, amount);

    sendUnifiedResponse(res, 201, 'Transaction successful', transaction.id);
  } catch (error) {
    logger.error('Error during transaction', error);
    next(error);
  }
}

// Controller to fetch all transactions for a specific user
export async function getAllUserTransactions(req: Request, res: Response, next: NextFunction) {
    try {
        const { userId } = req.params;

        if (!userId) {
            return sendUnifiedResponse(res, 400, 'Missing userId parameter');
        }

        const transactions = await getTransactionsByUserId(userId);
        sendUnifiedResponse(res, 200, 'Transactions fetched successfully', transactions);
    } catch (error) {
        logger.error('Error fetching transactions', error);
        next(error);
    }
}

// Controller to fetch all transactions
export async function getAllTransactions(req: Request, res: Response, next: NextFunction) {
    try {
        const transactions = await fetchAllTransactions(); // Assuming 'all' fetches all transactions
        sendUnifiedResponse(res, 200, 'All transactions fetched successfully', transactions);
    } catch (error) {
        logger.error('Error fetching all transactions', error);
        next(error);
    }
}

// Controller to fetch a specific transaction by ID for a specific user
export async function getTransactionById(req: Request, res: Response, next: NextFunction) {
    try {
        const { transactionId } = req.params;

        if (!transactionId) {
            return sendUnifiedResponse(res, 400, 'Missing userId or transactionId parameter');
        }

        const transaction = await fetchTransactionById(transactionId);

        if (!transaction) {
            return sendUnifiedResponse(res, 404, 'Transaction not found');
        }

        sendUnifiedResponse(res, 200, 'Transaction fetched successfully', transaction);
    } catch (error) {
        logger.error('Error fetching transaction', error);
        next(error);
    }
}
