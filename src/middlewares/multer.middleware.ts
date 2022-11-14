import { NextFunction, Request, Response } from 'express';
import { logger } from '@/utils/logger';
import { HttpResponse, HttpStatus } from '@config/Http';
import upload from '@/utils/multer';
import multer from 'multer';

const UploadMiddleware = (req: Request, res: Response, next: NextFunction) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      logger.error(`Upload ${err}`);
      return new HttpResponse(HttpStatus.BadRequest, { message: err.message }).sendResponse(res);
    } else if (err) {
      // An unknown error occurred when uploading.
      logger.error(`Upload ${err}`);
      return new HttpResponse(HttpStatus.BadRequest, { message: err.mesage }).sendResponse(res);
    }
    // Everything went fine.
    next();
  });
};

export default UploadMiddleware;
