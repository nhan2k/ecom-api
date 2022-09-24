import { Request, Response, Router } from 'express';
import UserRoute from './user/users.routes';
import AuthRoute from './auth/auth.routes';

class ModuleRoute {
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

    this.router.use(this.userRoute.router);
    this.router.use(this.authRoute.router);
  }
}

export default ModuleRoute;
