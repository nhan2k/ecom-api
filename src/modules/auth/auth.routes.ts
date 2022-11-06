import { Router } from 'express';
import AuthController from './auth.controller';
import PassportAuthen from '@middlewares/passport.middleware';

class AuthRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();
  public logFile = __filename;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/logout`, new PassportAuthen().authenRequest, this.authController.logOut);
    this.router.post(`${this.path}/reset-password`, new PassportAuthen().authenRequest, this.authController.resetPassword);
  }
}

export default AuthRoute;
