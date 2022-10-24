import { Request, Response } from 'express';
import AuthService from './auth.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';

class AuthController {
  public authService = new AuthService();
  public logFile = __filename;

  public signUp = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const result = await this.authService.signup(userData);

      return new HttpResponse(HttpStatus.Created, result).sendResponse(res);
    } catch (error) {
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public logIn = async (req: Request, res: Response) => {
    try {
      const userData = req.body;
      const data = await this.authService.login(userData);

      return new HttpResponse(HttpStatus.OK, data).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public signInFail = async (req: Request, res: Response) => {
    return new HttpResponse(HttpStatus.BadRequest, { message: 'SignIn Fail' }).sendResponse(res);
  };

  public logOut = async (req: Request, res: Response) => {
    try {
      req.session.destroy(function (error) {
        if (error) {
          return res.status(HttpStatus.BadRequest).json({ message: error.message });
        }
        return res.status(HttpStatus.OK).json({ message: 'Logout success' });
      });
    } catch (error) {
      return res.status(HttpStatus.BadRequest).json({ message: error.message });
    }
  };
}

export default AuthController;
