import { Router } from 'express';
import UserRoute from './user/user.routes';
import AuthRoute from './auth/auth.routes';

class ModuleRoute {
  public router: Router = Router();
  public userRoute: UserRoute = new UserRoute();
  public authRoute: AuthRoute = new AuthRoute();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.userRoute.router);
    this.router.use(this.authRoute.router);
  }
}

export default ModuleRoute;
