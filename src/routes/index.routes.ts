import { Request, Response, Router } from 'express';
import ModuleRoute from '@/modules/index.routes';
import bcrypt from 'bcryptjs';
import { Identifier } from 'sequelize';
import { logger } from '@/utils/logger';
import passport from 'passport';
import passportLocal from 'passport-local';
import UserModel from '@/modules/user/user.model';

class IndexRoute {
  public path = '/';
  public router = Router();
  public moduleRoute = new ModuleRoute();
  public LocalStrategy = passportLocal.Strategy;
  public logFile = __filename;

  constructor() {
    this.initializeRoutes();

    passport.use(
      new this.LocalStrategy(async (username: string, password: string, done: any) => {
        try {
          const user = await UserModel.findOne({ where: { username: username }, attributes: ['username', 'password', 'id'] });

          if (!user) {
            return done(done(null, false, { message: 'Incorrect username or password.' }));
          }

          bcrypt.compare(password, user.passwordhash).then(res => {
            if (!res) {
              return done(done(null, false, { message: 'Incorrect password.' }));
            }
            return done(null, user);
          });

          return done(null, user);
        } catch (error: any) {
          logger.error(`${this.logFile} error local strategy ${error.message}`);
          return done(error);
        }
      }),
    );

    passport.serializeUser(function (user: any, done) {
      done(null, user.id);
    });

    passport.deserializeUser(async (id: Identifier, done) => {
      try {
        const user = await UserModel.findOne({ where: { id: id } });

        if (user) {
          done(null, user);
        }
      } catch (error: any) {
        logger.error(`${this.logFile} deserializeUser error ${error.message}`);
        done(error);
      }
    });
  }

  private initializeRoutes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.send('App is running');
    });

    this.router.use('/api/v1', this.moduleRoute.router);
  }
}

export default IndexRoute;
