import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import Ajv from 'ajv';
import { DefinedError, JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import { SECRET_KEY } from '@config/env';
import { HttpResponse, HttpStatus } from '@config/Http';
import UserModel from '@/modules/user/user.model';
import { logger } from '@utils/logger';

const logFile = __filename;

const ajv = new Ajv();
addFormats(ajv, ['email']);
const auththenticationToken = async (req: Request, res: Response, next: NextFunction): Promise<HttpResponse | void> => {
  try {
    const Authorization = String(req.header('Authorization')).split(' ')[1];

    if (Authorization) {
      const secretKey: string = String(SECRET_KEY);
      const verificationResponse = verify(Authorization, secretKey);

      if (verificationResponse) {
        next();
      } else {
        return new HttpResponse(HttpStatus.BadRequest, 'Wrong authentication token');
      }
    } else {
      return new HttpResponse(HttpStatus.BadRequest, 'Authentication token missing');
    }
  } catch (error) {
    logger.error(`${logFile} ${error.message}`);
    return new HttpResponse(HttpStatus.BadRequest, 'Wrong authentication token');
  }
};

interface UserSignUp {
  email: string;
  password: string;
  phone_number?: string;
}
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userSchema: JSONSchemaType<UserSignUp> = {
      type: 'object',
      properties: {
        email: { type: 'string', nullable: true, format: 'email' },
        password: { type: 'string', minLength: 8 },
        phone_number: { type: 'string', nullable: true },
      },
      required: ['email', 'password'],
    };
    const validate = ajv.compile(userSchema);

    if (!validate(req.body)) {
      for (const err of validate.errors as DefinedError[]) {
        switch (err.keyword) {
          default:
            return new HttpResponse(HttpStatus.BadRequest, err).sendResponse(res);
        }
      }
    }
    const isEmailExists = await UserModel.findOne({ where: { email: req.body.email } });
    if (isEmailExists) {
      return new HttpResponse(HttpStatus.BadRequest, { message: 'Email is exists' }).sendResponse(res);
    }

    next();
  } catch (error) {
    logger.error(`${logFile} ${error.message}`);
    return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
  }
};

export { auththenticationToken, signup };
