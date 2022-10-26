import { Router } from 'express';
import CartController from './cart.controller';

class CartRoute {
  public path = '/cart';
  public router = Router();
  public CartController = new CartController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.CartController.getCarts);
    this.router.get(`${this.path}/:id(\\d+)`, this.CartController.getCartById);
    this.router.post(`${this.path}`, this.CartController.createCart);
    this.router.put(`${this.path}/:id(\\d+)`, this.CartController.updateCart);
    this.router.delete(`${this.path}/:id(\\d+)`, this.CartController.deleteCart);
  }
}

export default CartRoute;
