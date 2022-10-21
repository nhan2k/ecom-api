import { Router } from 'express';
import UsersController from './user.controller';
import authenticatedLocal from '@/middlewares/auth.middleware';

class UsersRoute {
  public path = '/user';
  public router = Router();
  public usersController = new UsersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, authenticatedLocal, this.usersController.getUsers);
    this.router.get(`${this.path}/:id(\\d+)`, authenticatedLocal, this.usersController.getUserById);
    this.router.post(`${this.path}`, authenticatedLocal, this.usersController.createUser);
    this.router.put(`${this.path}/:id(\\d+)`, authenticatedLocal, this.usersController.updateUser);
    this.router.delete(`${this.path}/:id(\\d+)`, authenticatedLocal, this.usersController.deleteUser);
  }
}

export default UsersRoute;
