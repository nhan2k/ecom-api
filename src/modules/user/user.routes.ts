import { Router } from 'express';
import UsersController from './user.controller';
import PassportAuthen from '@middlewares/passport.middleware';

class UserRoute {
  public path = '/user';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, new PassportAuthen().authenRequestVendor, this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, new PassportAuthen().authenRequestAdmin, this.usersController.getUserById);
    this.router.post(`${this.path}`, this.usersController.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, this.usersController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default UserRoute;
