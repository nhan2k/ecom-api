import { Request, Response } from 'express';
import AuthService from './auth.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';

class AuthController {
  public logFile = __filename;

  public async signUp(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const userData = req.body;
      const result = await new AuthService().signUp(userData);

      return new HttpResponse(HttpStatus.Created, result).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  }

  public async signIn(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { email } = req.body;
      const data = await new AuthService().signIn(email);
      return new HttpResponse(HttpStatus.OK, data).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  }

  public signInFail(req: Request, res: Response): Response<any, Record<string, any>> {
    return new HttpResponse(HttpStatus.BadRequest, { message: 'Login failed, please check your email or password' }).sendResponse(res);
  }

  public logOut(req: Request, res: Response): Response<any, Record<string, any>> {
    try {
      req.session.destroy(function (error) {
        if (error) {
          return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
        } else {
          res.clearCookie('connect.sid');
        }
      });
      return new HttpResponse(HttpStatus.OK, { message: 'LogOut success' }).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { email, password } = req.body;
      const response = await new AuthService().resetPassword(email, password);

      res.clearCookie('connect.sid');
      return new HttpResponse(HttpStatus.OK, response).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  }
}

export default AuthController;
