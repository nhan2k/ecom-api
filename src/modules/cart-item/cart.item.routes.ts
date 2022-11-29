import { Router } from 'express';
import CartItemController from './cart.item.controller';

class CartItemRoute {
  public path = '/cart-item';
  public router = Router();
  public CartItemController = new CartItemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.CartItemController.getCartItems);
    this.router.get(`${this.path}/:id(\\d+)`, this.CartItemController.getCartItemById);
    this.router.post(`${this.path}`, this.CartItemController.createCartItem);
    this.router.put(`${this.path}/:id(\\d+)`, this.CartItemController.updateCartItem);
    this.router.delete(`${this.path}/:id(\\d+)`, this.CartItemController.deleteCartItem);
    this.router.put(`${this.path}/update/:id(\\d+)`, this.CartItemController.updateQtyCartItem);
  }
}

export default CartItemRoute;
