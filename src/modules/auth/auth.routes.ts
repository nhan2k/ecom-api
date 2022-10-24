import { Router } from 'express';
import AuthController from './auth.controller';
import { auththenticationToken } from './auth.middleware';
import { signup } from './auth.middleware';
import passport from 'passport';

class AuthRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, signup, this.authController.signUp);
    this.router.post(`${this.path}`, this.authController.logIn);
    this.router.get(`${this.path}/login`, this.authController.signInFail);
    this.router.post(`${this.path}/logout`, passport.authenticate('jwt', { session: false }), auththenticationToken, this.authController.logOut);
  }
}

export default AuthRoute;
