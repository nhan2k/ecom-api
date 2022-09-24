import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@/config';
import DB from '@/databases';
import { HttpException } from '@/exceptions/HttpException';
import { logger } from '@/utils/logger';
import { DefinedError, JSONSchemaType } from 'ajv';
import Ajv from 'ajv';
import { HttpResponse } from '@/exceptions/HttpException';

const ajv = new Ajv();
const auththentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || String(req.header('Authorization')).split('Bearer ')[1];

    if (Authorization) {
      const secretKey: string = String(SECRET_KEY);
      const verificationResponse = verify(Authorization, secretKey);

      if (verificationResponse) {
        next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

interface UserSignUp {
  username: string;
  password: string;
  email?: string;
  phone_number?: string;
}
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userSchema: JSONSchemaType<UserSignUp> = {
      type: 'object',
      properties: {
        username: { type: 'string' },
        password: { type: 'string' },
        email: { type: 'string', nullable: true },
        phone_number: { type: 'string', nullable: true },
      },
      required: ['username', 'password'],
    };
    const validate = ajv.compile(userSchema);

    if (!validate(req.body)) {
      // The type cast is needed, as Ajv uses a wider type to allow extension
      // You can extend this type to include your error types as needed.
      for (const err of validate.errors as DefinedError[]) {
        switch (err.keyword) {
          case 'type':
            // err type is narrowed here to have "type" error params properties
            return new HttpResponse(400, { message: err.message }).sendResponse(res);

          case 'required':
            return new HttpResponse(400, { message: err.message }).sendResponse(res);
        }
      }
    }

    next();
  } catch (error: any) {
    logger.error(`Error signup ${error.message}`);
    next(new HttpException(401, 'Wrong signup'));
  }
};

export { auththentication, signup };
