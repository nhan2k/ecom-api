import App from '@/app';
import validateEnv from '@/utils/validateEnv';
import { logger } from './utils/logger';

class Server {
  constructor() {
    validateEnv();
    this.listenApp();
  }
  listenApp() {
    try {
      const app = new App();

      app.listen();
    } catch (error: any) {
      logger.error(`Unable connect App`);
    }
  }
}

export default new Server();
