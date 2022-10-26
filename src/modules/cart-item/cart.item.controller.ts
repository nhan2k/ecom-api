import { Request, Response } from 'express';
import CartItemService from './cart.item.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TCartItem } from './cart.item.interface';

class CartItemController {
  private logFile = __filename;
  public CartItemService = new CartItemService();

  public getCartItems = async (req: Request, res: Response): Promise<void> => {
    try {
      const findAllCartItemsData: TCartItem[] = await this.CartItemService.findAllCartItems();

      return new HttpResponse(HttpStatus.Created, findAllCartItemsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getCartItemById = async (req: Request, res: Response): Promise<void> => {
    try {
      const CartItemId = Number(req.params.id);
      const findOneCartItemData: TCartItem | null = await this.CartItemService.findCartItemById(CartItemId);

      return new HttpResponse(HttpStatus.Created, findOneCartItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const CartItemData: any = req.body;
      const createCartItemData: { message: string } = await this.CartItemService.createCartItem(CartItemData);

      return new HttpResponse(HttpStatus.Created, createCartItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const CartItemId = Number(req.params.id);
      const CartItemData: any = req.body;
      const updateCartItemData: any = await this.CartItemService.updateCartItem(CartItemId, CartItemData);

      return new HttpResponse(HttpStatus.Created, updateCartItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteCartItem = async (req: Request, res: Response): Promise<void> => {
    try {
      const CartItemId = Number(req.params.id);
      const deleteCartItemData: any = await this.CartItemService.deleteCartItem(CartItemId);

      return new HttpResponse(HttpStatus.Created, deleteCartItemData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default CartItemController;
