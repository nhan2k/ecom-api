import { Request, Response, Router } from 'express';
import ModuleRoute from '@/modules/index.routes';

class IndexRoute {
  public path = '/';
  public router = Router();
  public moduleRoute = new ModuleRoute();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.send('App is running');
    });

    this.router.use('/api/v1', this.moduleRoute.router);
  }
}

export default IndexRoute;
