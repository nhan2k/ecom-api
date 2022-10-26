import { Router } from 'express';
import AuthController from './auth.controller';
import { signup } from './auth.middleware';
import passport from 'passport';
import { Identifier } from 'sequelize';
import UserModel from '@modules/user/user.model';
import { logger } from '@utils/logger';

class AuthRoute {
  public path = '/auth';
  public router = Router();
  public authController = new AuthController();
  public logFile = __filename;

  constructor() {
    this.initializeRoutes();

    passport.serializeUser(function (user: any, done) {
      return done(null, user.id);
    });

    passport.deserializeUser(async (id: Identifier, done) => {
      try {
        const user = await UserModel.findOne({ where: { id: id } });

        if (user) {
          return done(null, user);
        }
      } catch (error: any) {
        logger.error(`${this.logFile} deserializeUser error ${error.message}`);
        return done(error);
      }
    });
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/signup`, signup, this.authController.signUp);
    this.router.post(`${this.path}`, passport.authenticate('local'), this.authController.logIn);
    this.router.get(`${this.path}/login`, this.authController.signInFail);
    this.router.post(`${this.path}/logout`, passport.authenticate('local'), this.authController.logOut);
  }
}

export default AuthRoute;
