import { Request, Response } from 'express';
import AuthService from './auth.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';

class AuthController {
  public logFile = __filename;

  public signUp = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userData = req.body;
      const result = await new AuthService().signup(userData);

      return new HttpResponse(HttpStatus.Created, result).sendResponse(res);
    } catch (error) {
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public logIn = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const { email } = req.body;
      const data = await new AuthService().login(email);
      return new HttpResponse(HttpStatus.OK, data).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public signInFail = (req: Request, res: Response): Response<any, Record<string, any>> => {
    return new HttpResponse(HttpStatus.BadRequest, { message: 'SignIn Fail' }).sendResponse(res);
  };

  public logOut = (req: Request, res: Response): Response<any, Record<string, any>> => {
    try {
      req.session.destroy(function (error) {
        if (error) {
          return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
        } else {
          res.clearCookie('connect.sid');
        }
      });
      return new HttpResponse(HttpStatus.OK, 'LogOut success').sendResponse(res);
    } catch (error) {
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };
}

export default AuthController;
