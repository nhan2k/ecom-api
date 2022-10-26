import { HttpResponse, HttpStatus } from '@config/Http';
import { NextFunction, Request, Response } from 'express';

class PassportAuthen {
  constructor() {}

  authenRequest(req: Request, res: Response, next: NextFunction) {
    if (req.isAuthenticated()) {
      console.log(req.user['id']);
      next();
    } else {
      return new HttpResponse(HttpStatus.Unauthorized, { message: 'Unauthentication' }).sendResponse(res);
    }
  }

  authenRequestVendor(req: Request, res: Response, next: NextFunction) {
    if (req.user) {
      if (req.user['id']) next();
    } else {
      return new HttpResponse(HttpStatus.Unauthorized, { message: 'Unauthentication' }).sendResponse(res);
    }
  }
}
export default PassportAuthen;
