import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@/utils/logger';

const authenticatedLocal = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { message, status }: HttpException = new HttpException(400, 'Not Auth');

    if (!req.isAuthenticated()) {
      logger.error(`[${req.method}] ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);
      return res.status(status).json({ message });
    }
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticatedLocal;
