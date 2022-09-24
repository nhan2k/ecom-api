import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Router } from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT, ORIGIN, CREDENTIALS } from '@/config';
import DB from '@/databases';
import errorMiddleware from '@/middlewares/error.middleware';
import { logger, stream } from '@/utils/logger';
import IndexRoute from '@/routes/index.routes';
class App {
  public app: express.Application;
  public env: string;
  public port: string | number;
  public router: Router;

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
      await DB.sequelize.authenticate();
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
  }

  private initializeRoutes() {
    this.app.use('/', this.router);
  }

  private initializeErrorHandling() {
    this.app.use(errorMiddleware);
  }
}

export default App;
