import App from '@/app';
import validateEnv from '@/utils/validateEnv';
import { logger } from './utils/logger';

class Server {
  public logFile = __filename;

  constructor() {
    validateEnv();
    this.listenApp();
  }
  listenApp() {
    try {
      const app = new App();

      app.listen();
    } catch (error: any) {
      logger.error(`${this.logFile} Unable connect App ${error.message}`);
    }
  }
}

export default new Server();
