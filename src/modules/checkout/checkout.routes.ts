import { Router } from 'express';
import CheckoutController from './checkout.controller';

class CheckoutRoute {
  public path = '/checkout';
  public router = Router();
  public checkoutController = new CheckoutController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}`, this.checkoutController.checkout);
  }
}

export default CheckoutRoute;
