import { Request, Response } from 'express';
import AuthService from './auth.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
// import BotTelegram from '@utils/telegramBotApi';
import _ from 'lodash';

class AuthController {
  public logFile = __filename;

  public async signUp(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const userData = req.body;
      const result = await new AuthService().signUp(userData);
      // BotTelegram.botSendMessage(`${email} signUp`);
      if (_.get(result, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, result).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.Created, result).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  }

  public async signUpVendor(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const userData = req.body;
      let isVendor = true;
      const result = await new AuthService().signUp(userData, isVendor);
      // BotTelegram.botSendMessage(`${email} signUp`);
      if (_.get(result, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, result).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.Created, result).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  }

  public async signIn(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { email } = req.body;
      const data = await new AuthService().signIn(email);
      // BotTelegram.botSendMessage(`${email} signIn`);
      if (_.get(data, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, data).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, data).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  }

  public async signInVendor(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { email } = req.body;
      let isVendor = true;
      const data = await new AuthService().signInVendor(email);
      // BotTelegram.botSendMessage(`${email} signIn`);
      if (_.get(data, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, data).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, data).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  }

  public signInFail(req: Request, res: Response): Response<any, Record<string, any>> {
    return new HttpResponse(HttpStatus.BadRequest, { message: 'Login failed, please check your email or password' }).sendResponse(res);
  }

  public logOut(req: Request, res: Response): Response<any, Record<string, any>> {
    try {
      req.session.destroy(function (error) {
        if (error) {
          return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
        }
      });
      res.clearCookie('connect.sid');
      return new HttpResponse(HttpStatus.OK, { message: 'LogOut success' }).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  }

  public async resetPassword(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { email, password } = req.body;
      const response = await new AuthService().resetPassword(email, password);
      // BotTelegram.botSendMessage(`${email} reset password`);
      if (_.get(response, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, response).sendResponse(res);
      }
      res.clearCookie('connect.sid');
      return new HttpResponse(HttpStatus.OK, response).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  }

  public async sendLinkReset(req: Request, res: Response): Promise<Response<any, Record<string, any>>> {
    try {
      const { email } = req.params;
      const response = await new AuthService().sendLinkReset(email);
      // BotTelegram.botSendMessage(`${email} reset password`);
      if (_.get(response, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, response).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, response).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  }

  public updateUser = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const userData = req.body;
      let content: string = `{"img": "${String(req.file?.filename)}"}`;
      if (!content.includes('undefined')) {
        userData.content = JSON.parse(content);
      }
      const updateUserData = await new AuthService().updateUser(id, userData);
      if (_.get(updateUserData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateUserData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateUserData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default AuthController;
