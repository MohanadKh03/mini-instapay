import { Request, Response, NextFunction } from 'express';
import { makeTransactionSummary } from '../services/reporting.service';
import { sendUnifiedResponse } from '../utils/response';
import { logger } from '../utils/logger';

// Controller to handle sending money
export async function generateUserTransactionsSummary(req: Request, res: Response, next: NextFunction) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return sendUnifiedResponse(res, 400, 'Missing userId parameter');
    }

    const transactionsSummary = await makeTransactionSummary(userId);

    sendUnifiedResponse(res, 201, 'Transactions report generated successfully', transactionsSummary);
  } catch (error) {
    logger.error('Error during transaction', error);
    next(error);
  }
}
