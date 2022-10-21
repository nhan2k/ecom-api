import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SECRET_KEY } from '@config/env';
import { HttpResponse, HttpStatus } from '@config/Http';
import { DefinedError, JSONSchemaType } from 'ajv';
import Ajv from 'ajv';
import UserModel from '@/modules/user/user.model';
import { logger } from '@utils/logger';

const logFile = __filename;

const ajv = new Ajv();
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
        username: { type: 'string', minLength: 8 },
        password: { type: 'string', minLength: 8 },
        email: { type: 'string', nullable: true },
        phone_number: { type: 'string', nullable: true },
      },
      required: ['username', 'password'],
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

    console.log('object');
    const isUsername = await UserModel.findOne({ where: { username: req.body.username } });
    if (isUsername) {
      return new HttpResponse(HttpStatus.BadRequest, { message: 'Username is exists' }).sendResponse(res);
    }

    next();
  } catch (error) {
    logger.error(`${logFile} ${error.message}`);
    return new HttpResponse(HttpStatus.BadRequest, 'Wrong signup');
  }
};

export { auththenticationToken, signup };
