import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';  // Assuming you have a function to verify the JWT token

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: No token provided or invalid format' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const user = verifyToken(token);  // Assuming the `verifyToken` function decodes the token and returns user data
    (req as any).user = user;  // Attach the decoded user data to the request object
    next();  // Move to the next middleware or route handler
    return res.status(200).json({ message: 'Token is valid', user });
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid or expired token' });
  }
}
