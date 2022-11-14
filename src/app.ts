import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import {
  NODE_ENV,
  PORT,
  LOG_FORMAT,
  ORIGIN,
  CREDENTIALS,
  SESSION_SECRET,
  SESSION_MAX_AGE,
  ISSUER,
  AUDIENCE,
  SECRET_KEY,
  REDIS_PASS,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_DB,
  REDIS_USERNAME,
} from '@config/env';
import { sequelize } from '@connections/databases';
import errorMiddleware from '@/middlewares/error.middleware';
import { logger, stream } from '@/utils/logger';
import IndexRoute from '@/routes/index.routes';
import passport from 'passport';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Ioredis from 'ioredis';
import path from 'path';
import Associations from '@connections/databases/associations';
import UserModel from '@modules/user/user.model';
import passportJWT from 'passport-jwt';
import passportLocal from 'passport-local';
import { compare } from 'bcryptjs';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public router: Router;
  public logFile = __filename;
  public LocalStrategy = passportLocal.Strategy;
  public JwtStrategy = passportJWT.Strategy;
  public ExtractJwt = passportJWT.ExtractJwt;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 4000;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    try {
      this.app.listen(this.port, () => {
        logger.info(`${this.logFile} ======= ENV: ${this.env} =======`);
        logger.info(`${this.logFile} 🚀 App listening on the port ${this.port}`);
      });
    } catch (error: any) {
      logger.error(`${this.logFile} Unable to connect to the app: ${error.message}`);
    }
  }

  private async connectToDatabase() {
    try {
      await sequelize.authenticate();
      new Associations().associations();
      logger.info(`${this.logFile} Connection DB & associations has been established successfully.`);
    } catch (error: any) {
      logger.error(`${this.logFile} Unable to connect to the database: ${error.message}`);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(String(LOG_FORMAT), { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: Boolean(CREDENTIALS) }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use('/public', express.static('public'));
    this.app.use(passport.initialize());
    const RedisStore = connectRedis(session);
    const redisClient = new Ioredis({
      host: REDIS_HOST,
      username: REDIS_USERNAME,
      password: REDIS_PASS,
      port: Number(REDIS_PORT),
      db: Number(REDIS_DB),
    });
    this.app.use(
      session({
        saveUninitialized: true,
        resave: false,
        secret: String(SESSION_SECRET),
        cookie: {
          secure: false,
          httpOnly: false,
          maxAge: Number(SESSION_MAX_AGE),
        },
        store: new RedisStore({ client: redisClient }),
      }),
    );
    this.app.use(passport.session());
  }

  private initializeRoutes() {
    let opts: passportJWT.StrategyOptions = {
      jwtFromRequest: this.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: SECRET_KEY,
      issuer: ISSUER,
      audience: AUDIENCE,
    };
    passport.use(
      new this.JwtStrategy(opts, async function (jwt_payload, done) {
        try {
          const user = await UserModel.findOne({ where: { id: jwt_payload.jti }, attributes: ['id'] });
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error: any) {
          logger.error(`${this.logFile} ${error.message}`);
          return done(error, false);
        }
      }),
    );

    passport.use(
      new this.LocalStrategy(
        {
          usernameField: 'email',
          passwordField: 'password',
        },
        async function (username: string, password: string, done: any) {
          try {
            const user: UserModel | null = await UserModel.findOne({
              where: { email: username },
              attributes: ['email', 'passwordHash', 'id', 'vendor', 'admin'],
            });
            if (!user) {
              done(null, false);
            } else {
              compare(password, user.passwordHash).then(res => {
                if (res) {
                  const { email, id, vendor, admin } = user;
                  done(null, { email, id, vendor, admin });
                } else {
                  done(null, false);
                }
              });
            }
          } catch (error: any) {
            logger.error(`${this.logFile} ${error.message}`);
            done(error, false);
          }
        },
      ),
    );

    this.app.use(passport.authenticate('session'));
    this.router = new IndexRoute().router;
    this.app.use('/', this.router);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
