import { Response } from 'express';


export function sendUnifiedResponse(res: Response, statusCode: number, message: string, data: any = null) {
  res.status(statusCode).json({
    statusCode,
    message,
    data,
  });
}