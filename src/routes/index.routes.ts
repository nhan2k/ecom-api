import { Request, Response, Router } from 'express';
import ModuleRoute from '@/modules/index.routes';
import { signup } from '@modules/auth/auth.middleware';
import passport from 'passport';
import { Identifier } from 'sequelize';
import UserModel from '@modules/user/user.model';
import { logger } from '@utils/logger';
import AuthController from '@modules/auth/auth.controller';
import PassportAuthen from '@middlewares/passport.middleware';

class IndexRoute {
  public path = '/api/v1';
  public router = Router();
  public moduleRoute = new ModuleRoute();
  public logFile = __filename;
  public authController = new AuthController();
  public passportAuthen = new PassportAuthen();

  constructor() {
    this.initializeRoutes();

    passport.serializeUser(function (user: UserModel, done) {
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    });

    passport.deserializeUser((user: UserModel, done) => {
      if (!user) {
        return done(null, false);
      } else {
        done(null, user);
      }
    });
  }

  private initializeRoutes() {
    this.router.get('/', (req: Request, res: Response) => {
      return res.status(200).json({ message: 'App is running' });
    });

    this.router.post('/signup', signup, this.authController.signUp);
    this.router.post(`${this.path}`, passport.authenticate('local', { failureRedirect: '/login' }), this.authController.signIn);
    this.router.get('/login', this.authController.signInFail);
    this.router.use(`${this.path}`, this.passportAuthen.authenRequest, this.moduleRoute.router);
  }
}

export default IndexRoute;
