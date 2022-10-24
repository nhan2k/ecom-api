import { Request, Response } from 'express';
import userService from './user.service';
import UserModel from '@modules/user/user.model';
import { HttpResponse, HttpStatus } from '@config/Http';

class UserController {
  public userService = new userService();

  public getUsers = async (req: Request, res: Response) => {
    try {
      const findAllUsersData: UserModel[] = await this.userService.findAllUser();

      return new HttpResponse(HttpStatus.Created, findAllUsersData).sendResponse(res);
    } catch (error) {
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getUserById = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: UserModel = await this.userService.findUserById(userId);

      return new HttpResponse(HttpStatus.Created, findOneUserData).sendResponse(res);
    } catch (error) {
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createUser = async (req: Request, res: Response) => {
    try {
      const userData: any = req.body;
      const createUserData: any = await this.userService.createUser(userData);

      return new HttpResponse(HttpStatus.Created, createUserData).sendResponse(res);
    } catch (error) {
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const userData: any = req.body;
      const updateUserData: any = await this.userService.updateUser(userId, userData);

      return new HttpResponse(HttpStatus.Created, updateUserData).sendResponse(res);
    } catch (error) {
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteUser = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: any = await this.userService.deleteUser(userId);

      return new HttpResponse(HttpStatus.Created, deleteUserData).sendResponse(res);
    } catch (error) {
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default UserController;
