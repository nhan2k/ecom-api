import { HttpResponse } from '@/exceptions/HttpException';
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const signUpUserData: any = await this.authService.signup(userData);

      return new HttpResponse(201, { message: 'signup', data: signUpUserData }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const { findUser } = await this.authService.login(userData);

      return new HttpResponse(200, { message: 'signup', data: findUser }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: any = {
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
      };
      const logOutUserData: any = await this.authService.logout(userData);

      res.status(200).json({ data: logOutUserData, message: 'logout' });
    } catch (error) {
      next(error);
    }
  };
}

export default AuthController;
