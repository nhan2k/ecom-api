import { Request, Response } from 'express';
import userService from './user.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class UserController {
  private logFile = __filename;
  public userService = new userService();

  public getUsers = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const findAllUsersData = await this.userService.findAllUser(id);
      if (!Array.isArray(findAllUsersData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllUsersData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findAllUsersData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getUserById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const findOneUserData = await this.userService.findUserById(id);
      if (_.get(findOneUserData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneUserData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneUserData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userData = req.body;
      const createUserData = await this.userService.createUser(userData);
      if (_.get(createUserData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createUserData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, createUserData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let userId = req.user ? req.user['id'] : null;
      if (!userId) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const userData = req.body;
      const updateUserData = await this.userService.updateUser(userId, userData);
      if (_.get(updateUserData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateUserData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateUserData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const userId = Number(req.params.id);
      const deleteUserData = await this.userService.deleteUser(userId);
      if (_.get(deleteUserData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteUserData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteUserData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default UserController;
