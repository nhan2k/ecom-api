import { Request, Response, Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import UserRoute from './user/users.routes';
import AuthRoute from './auth/auth.routes';

class ModuleRoute implements Routes {
  public path: string = '/api/v1';
  public router: Router = Router();
  public userRoute: UserRoute = new UserRoute();
  public authRoute: AuthRoute = new AuthRoute();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', (req: Request, res: Response) => {
      res.send('App is running');
    });

    this.router.use(this.path, this.userRoute.router);
    this.router.use(this.path, this.authRoute.router);
  }
}

export default ModuleRoute;
