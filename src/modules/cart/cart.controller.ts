import { Request, Response } from 'express';
import CartService from './cart.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TCart } from './cart.interface';

class CartController {
  private logFile = __filename;
  public CartService = new CartService();

  public getCarts = async (req: Request, res: Response): Promise<void> => {
    try {
      const findAllCartsData: TCart[] = await this.CartService.findAllCart();

      return new HttpResponse(HttpStatus.Created, findAllCartsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getCartById = async (req: Request, res: Response): Promise<void> => {
    try {
      const CartId = Number(req.params.id);
      const findOneCartData: TCart | null = await this.CartService.findCartById(CartId);

      return new HttpResponse(HttpStatus.Created, findOneCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const CartData: any = req.body;
      const createCartData: any = await this.CartService.createCart(CartData);

      return new HttpResponse(HttpStatus.Created, createCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const CartId = Number(req.params.id);
      const CartData: any = req.body;
      const updateCartData: any = await this.CartService.updateCart(CartId, CartData);

      return new HttpResponse(HttpStatus.Created, updateCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteCart = async (req: Request, res: Response): Promise<void> => {
    try {
      const CartId = Number(req.params.id);
      const deleteCartData: any = await this.CartService.deleteCart(CartId);

      return new HttpResponse(HttpStatus.Created, deleteCartData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default CartController;
