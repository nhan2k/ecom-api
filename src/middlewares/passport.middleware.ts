import { HttpResponse, HttpStatus } from '@config/Http';
import { NextFunction, Request, Response } from 'express';

class PassportAuthen {
  constructor() {}

  authenRequest(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      next();
    } else {
      return new HttpResponse(HttpStatus.Unauthorized, { message: 'Unauthentication' }).sendResponse(res);
    }
  }

  async authenRequestVendor(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      if (req.user['vendor'] === 0) {
        return new HttpResponse(HttpStatus.Unauthorized, { message: 'Permission Penied' }).sendResponse(res);
      } else {
        next();
      }
    } else {
      return new HttpResponse(HttpStatus.Unauthorized, { message: 'Unauthentication' }).sendResponse(res);
    }
  }

  async authenRequestAdmin(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      if (req.user['admin'] === 0) {
        return new HttpResponse(HttpStatus.Unauthorized, { message: 'Permission Penied' }).sendResponse(res);
      } else {
        next();
      }
    } else {
      return new HttpResponse(HttpStatus.Unauthorized, { message: 'Unauthentication' }).sendResponse(res);
    }
  }
}
export default PassportAuthen;
