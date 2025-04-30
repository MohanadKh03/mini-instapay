import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { sendUnifiedResponse } from '../utils/response'; // Assuming you have a utility function to send responses

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  logger.error('Unhandled error', err);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  sendUnifiedResponse(res, statusCode, message);

  res.status(statusCode).json({ status: 'error', message });
}