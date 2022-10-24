import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, SESSION_SECRET, SESSION_MAX_AGE } from '@config/env';
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

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public router: Router;
  public redisStore = connectRedis(session);
  public logFile = __filename;

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 4000;
    this.router = new IndexRoute().router;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
    this.connectCache();
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
      logger.info(`${this.logFile} Connection has been established successfully.`);
    } catch (error: any) {
      logger.error(`${this.logFile} Unable to connect to the database: ${error.message}`);
    }
  }

  private initializeMiddlewares() {
    this.app.use(morgan(String(LOG_FORMAT), { stream }));
    this.app.use(cors({ origin: ORIGIN, credentials: CREDENTIALS }));
    this.app.use(hpp());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cookieParser());
    this.app.use(express.static(path.join(__dirname, 'public')));
  }

  private initializeRoutes() {
    this.app.use('/', this.router);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }

  private connectCache() {
    try {
      const redisClient = new Ioredis({
        password: 'eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81',
      });

      this.app.use(
        session({
          saveUninitialized: false,
          resave: true,
          secret: String(SESSION_SECRET),
          cookie: {
            maxAge: Number(SESSION_MAX_AGE),
          },
          store: new this.redisStore({ client: redisClient }),
        }),
      );
      this.app.use(passport.authenticate('session'));

      this.app.use(passport.initialize());
      this.app.use(passport.session());
      logger.info(`Connect Redis & Enable passport`);
    } catch (error) {
      logger.error(`connectCache ${error}`);
      return error;
    }
  }
}

export default App;
