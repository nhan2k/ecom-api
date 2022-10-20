import { HttpResponse } from '@config/Http';
import { NextFunction, Request, Response } from 'express';
import AuthService from './auth.service';

class AuthController {
  public authService = new AuthService();

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      await this.authService.signup(userData);

      return new HttpResponse(201, { message: 'Signup success' }).sendResponse(res);
    } catch (error) {
      return new HttpResponse(201, { message: 'Signup success' }).sendResponse(res);
    }
  };

  public logIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData = req.body;
      const data = await this.authService.login(userData);

      return new HttpResponse(200, { message: 'signup', data: data }).sendResponse(res);
    } catch (error) {
      next(error);
    }
  };

  public logOut = async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.session.destroy(function (error) {
        if (error) {
          return res.status(200).json({ message: error.message });
        }
        return res.status(200).json({ message: 'Logout success' });
      });
    } catch (error) {
      return res.status(200).json({ message: error.message });
    }
  };
}

export default AuthController;
