import OrderModel from './order.model';
import { logger } from '@utils/logger';

class OrderService {
  public logFile = __filename;

  public async findAllOrders(): Promise<OrderModel[] | { message: string }> {
    try {
      const allOrder: OrderModel[] = await OrderModel.findAll();
      return allOrder;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findOrderById(OrderId: number): Promise<OrderModel | null | { message: string }> {
    try {
      const findOrder = await OrderModel.findByPk(OrderId);
      if (!findOrder) {
        return { message: "Order doesn't exist" };
      }
      return findOrder;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createOrder(OrderData: any, id: number): Promise<OrderModel | { message: string }> {
    try {
      const res = await OrderModel.create({ ...OrderData, userId: id });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateOrder(OrderId: number, OrderData: any): Promise<OrderModel | null | { message: string }> {
    try {
      const findOrder = await OrderModel.findByPk(OrderId);
      if (!findOrder) {
        return { message: "Order doesn't exist" };
      }
      await OrderModel.update({ ...OrderData }, { where: { id: OrderId } });
      const res = OrderModel.findByPk(OrderId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteOrder(OrderId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findOrder: any = await OrderModel.findByPk(OrderId);
      if (!findOrder) {
        return { message: "Order doesn't exist" };
      }
      await OrderModel.destroy({ where: { id: OrderId } });

      return { id: OrderId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default OrderService;
