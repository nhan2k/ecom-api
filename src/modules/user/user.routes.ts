import { Router } from 'express';
import passport from 'passport';
import UsersController from './user.controller';

class UserRoute {
  public path = '/user';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, passport.authenticate('jwt', { session: false }), this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, this.usersController.getUserById);
    this.router.post(`${this.path}`, this.usersController.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, this.usersController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, this.usersController.deleteUser);
  }
}

export default UserRoute;
