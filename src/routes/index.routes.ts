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

    passport.serializeUser(function (user: any, done) {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: Identifier, done) => {
      try {
        const user: UserModel | null = await UserModel.findOne({ where: { id: id }, attributes: ['id', 'email', 'admin', 'vendor'] });

        if (user) {
          done(null, user);
        } else {
          done(null, false);
        }
      } catch (error: any) {
        logger.error(`${this.logFile} deserializeUser error ${error.message}`);
        done(error);
      }
    });
  }

  private initializeRoutes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.status(200).json({ message: 'App is running' });
    });
    this.router.post('/signup', signup, this.authController.signUp);
    this.router.post(`${this.path}`, passport.authenticate('local', { failureRedirect: '/login' }), this.authController.logIn);
    this.router.get('/login', this.authController.signInFail);
    this.router.use(`${this.path}`, this.passportAuthen.authenRequest, this.moduleRoute.router);
  }
}

export default IndexRoute;
