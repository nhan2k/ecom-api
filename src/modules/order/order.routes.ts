import { Router } from 'express';
import OrderController from './order.controller';

class OrderRoute {
  public path = '/order';
  public router = Router();
  public OrderController = new OrderController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.OrderController.getOrders);
    this.router.get(`${this.path}/:id(\\d+)`, this.OrderController.getOrderById);
    this.router.post(`${this.path}`, this.OrderController.createOrder);
    this.router.put(`${this.path}/:id(\\d+)`, this.OrderController.updateOrder);
    this.router.delete(`${this.path}/:id(\\d+)`, this.OrderController.deleteOrder);
  }
}

export default OrderRoute;