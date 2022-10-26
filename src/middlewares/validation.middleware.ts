import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { RequestHandler } from 'express';
import { HttpResponse, HttpStatus } from '@config/Http';

const validationMiddleware = (
  type: any,
  value: string | 'body' | 'query' | 'params' = 'body',
  skipMissingProperties = false,
  whitelist = true,
  forbidNonWhitelisted = true,
): RequestHandler => {
  return (req, res, next) => {
    validate(plainToClass(type, req[value]), { skipMissingProperties, whitelist, forbidNonWhitelisted }).then((errors: ValidationError[]) => {
      if (errors.length > 0) {
        // const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
        next(new HttpResponse(HttpStatus.BadRequest, errors).sendResponse(res));
      } else {
        next();
      }
    });
  };
};

export default validationMiddleware;
