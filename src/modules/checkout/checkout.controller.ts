import { Request, Response } from 'express';
import CheckoutService from './checkout.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class CheckoutController {
  private logFile = __filename;
  public checkoutService = new CheckoutService();

  public checkout = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }

      const response = await this.checkoutService.checkout(id, req.body);
      if (_.get(response, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, response).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, response).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default CheckoutController;
