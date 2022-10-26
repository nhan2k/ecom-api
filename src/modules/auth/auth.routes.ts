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
    this.router.post(`${this.path}/logout`, new PassportAuthen().authenRequest, this.authController.logOut);
  }
}

export default AuthRoute;
