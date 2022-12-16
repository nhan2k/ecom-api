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
    this.router.get(`${this.path}/getOne`, this.CartController.getCartById);
    this.router.put(`${this.path}/`, this.CartController.updateCart);
    this.router.delete(`${this.path}/:id(\\d+)`, this.CartController.deleteCart);
    this.router.get(`${this.path}/count`, this.CartController.countCart);
    this.router.get(`${this.path}/personCart`, this.CartController.getPersonCart);
  }
}

export default CartRoute;
