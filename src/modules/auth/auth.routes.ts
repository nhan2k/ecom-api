import { Router } from 'express';
import AuthController from './auth.controller';
import { auththentication } from './auth.middleware';
import { signup } from './auth.middleware';
class AuthRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, signup, this.authController.signUp);
    this.router.post(`${this.path}/login`, this.authController.logIn);
    this.router.post(`${this.path}/logout`, auththentication, this.authController.logOut);
  }
}

export default AuthRoute;
