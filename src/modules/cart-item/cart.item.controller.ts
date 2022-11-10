import { Request, Response } from 'express';
import CartItemService from './cart.item.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class CartItemController {
  private logFile = __filename;
  public CartItemService = new CartItemService();

  public getCartItems = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllCartItemsData = await this.CartItemService.findAllCartItems();
      if (!Array.isArray(findAllCartItemsData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllCartItemsData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, findAllCartItemsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getCartItemById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CartItemId = Number(req.params.id);
      const findOneCartItemData = await this.CartItemService.findCartItemById(CartItemId);
      if (_.get(findOneCartItemData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneCartItemData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneCartItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createCartItem = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CartItemData = req.body;
      const createCartItemData = await this.CartItemService.createCartItem(CartItemData);
      if (_.get(createCartItemData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createCartItemData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, createCartItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateCartItem = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CartItemId = Number(req.params.id);
      const CartItemData = req.body;
      const updateCartItemData = await this.CartItemService.updateCartItem(CartItemId, CartItemData);
      if (_.get(updateCartItemData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateCartItemData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateCartItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteCartItem = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const CartItemId = Number(req.params.id);
      const deleteCartItemData = await this.CartItemService.deleteCartItem(CartItemId);
      if (_.get(deleteCartItemData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteCartItemData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteCartItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default CartItemController;
