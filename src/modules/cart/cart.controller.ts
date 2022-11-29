import { Request, Response } from 'express';
import CartService from './cart.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class CartController {
  private logFile = __filename;
  public CartService = new CartService();

  public getCarts = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllCartsData = await this.CartService.findAllCart();
      if (!Array.isArray(findAllCartsData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllCartsData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, findAllCartsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public getCartById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CartId = Number(req.params.id);
      const findOneCartData = await this.CartService.findCartById(CartId);
      if (_.get(findOneCartData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneCartData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public createCart = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CartData = req.body;
      const createCartData = await this.CartService.createCart(CartData);
      if (_.get(createCartData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createCartData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.Created, createCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public updateCart = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CartId = Number(req.params.id);
      const CartData = req.body;
      const updateCartData = await this.CartService.updateCart(CartId, CartData);
      if (_.get(updateCartData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateCartData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.Created, updateCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public deleteCart = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CartId = Number(req.params.id);
      const deleteCartData: any = await this.CartService.deleteCart(CartId);
      if (_.get(deleteCartData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteCartData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, deleteCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public countCart = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const countCartData: any = await this.CartService.countCart(id);
      if (_.get(countCartData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, countCartData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, countCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public getPersonCart = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const personCartData: any = await this.CartService.getPersonCart(id);
      if (_.get(personCartData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, personCartData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, personCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };
}

export default CartController;
