import { Request, Response } from 'express';
import userService from './user.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TUser } from './user.interface';

class UserController {
  private logFile = __filename;
  public userService = new userService();

  public getUsers = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllUsersData: TUser[] = await this.userService.findAllUser();

      return new HttpResponse(HttpStatus.OK, findAllUsersData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userId = Number(req.params.id);
      const findOneUserData: TUser | null = await this.userService.findUserById(userId);

      return new HttpResponse(HttpStatus.OK, findOneUserData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userData: any = req.body;
      const createUserData: any = await this.userService.createUser(userData);

      return new HttpResponse(HttpStatus.Created, createUserData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userId = Number(req.params.id);
      const userData: any = req.body;
      const updateUserData: any = await this.userService.updateUser(userId, userData);

      return new HttpResponse(HttpStatus.Created, updateUserData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData: any = await this.userService.deleteUser(userId);

      return new HttpResponse(HttpStatus.OK, deleteUserData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default UserController;
