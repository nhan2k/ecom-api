import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS, SESSION_SECRET, SESSION_MAX_AGE } from '@/config';
import { sequelize } from '@/databases';
import errorMiddleware from '@/middlewares/error.middleware';
import { logger, stream } from '@/utils/logger';
import IndexRoute from '@/routes/index.routes';
import passport from 'passport';
import connectRedis from 'connect-redis';
import session from 'express-session';
import Ioredis from 'ioredis';
import path from 'path';

class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public router: Router;
  public redisStore = connectRedis(session);

  constructor() {
    this.app = express();
    this.env = NODE_ENV || 'development';
    this.port = PORT || 3000;
    this.router = new IndexRoute().router;

    this.connectToDatabase();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  public listen() {
    try {
      this.app.listen(this.port, () => {
        logger.info(`=================================`);
        logger.info(`======= ENV: ${this.env} =======`);
        logger.info(`🚀 App listening on the port ${this.port}`);
        logger.info(`=================================`);
      });
    } catch (error: any) {
      logger.error(`Unable to connect to the app: ${error.message}`);
    }
  }

  private async connectToDatabase() {
    try {
      await sequelize.authenticate();
      logger.info('Connection has been established successfully.');
    } catch (error: any) {
      logger.error(`Unable to connect to the database: ${error.message}`);
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

    const redisClient = new Ioredis({
      port: 15846, // Redis port
      host: 'redis-15846.c98.us-east-1-4.ec2.cloud.redislabs.com', // Redis host
      username: 'default', // needs Redis >= 6
      password: 'MXnm20zEaiCloDoyO3aucaYNmP6PkQix',
      db: 0, // Defaults to 0}
    });

    this.app.use(
      session({
        saveUninitialized: false,
        resave: true,
        secret: String(SESSION_SECRET),
        cookie: {
          maxAge: Number(SESSION_MAX_AGE),
        },
        // store: new this.redisStore({ client: redisClient }),
      }),
    );
    this.app.use(passport.authenticate('session'));

    this.app.use(passport.initialize());
    this.app.use(passport.session());
  }

  private initializeRoutes() {
    this.app.use('/', this.router);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
