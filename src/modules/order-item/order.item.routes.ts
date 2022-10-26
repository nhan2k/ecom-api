import { Router } from 'express';
import OrderItemController from './order.item.controller';

class OrderItemRoute {
  public path = '/order-item';
  public router = Router();
  public OrderItemController = new OrderItemController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.OrderItemController.getOrderItems);
    this.router.get(`${this.path}/:id(\\d+)`, this.OrderItemController.getOrderItemById);
    this.router.post(`${this.path}`, this.OrderItemController.createOrderItem);
    this.router.put(`${this.path}/:id(\\d+)`, this.OrderItemController.updateOrderItem);
    this.router.delete(`${this.path}/:id(\\d+)`, this.OrderItemController.deleteOrderItem);
  }
}

export default OrderItemRoute;
