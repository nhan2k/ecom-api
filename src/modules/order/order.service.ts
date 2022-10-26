import OrderModel from './order.model';
import { logger } from '@utils/logger';

class OrderService {
  public logFile = __filename;

  public async findAllOrders(): Promise<OrderModel[]> {
    try {
      const allOrder: OrderModel[] = await OrderModel.findAll();
      return allOrder;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findOrderById(OrderId: number): Promise<OrderModel | null> {
    try {
      const findOrder: OrderModel | null = await OrderModel.findByPk(OrderId);
      return findOrder;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createOrder(OrderData: any): Promise<{ message: string }> {
    try {
      console.log(OrderData);
      await OrderModel.create({ ...OrderData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateOrder(OrderId: number, OrderData: any): Promise<{ message: string }> {
    try {
      const findOrder: OrderModel | null = await OrderModel.findByPk(OrderId);
      if (!findOrder) {
        return { message: "Order doesn't exist" };
      }
      await OrderModel.update({ ...OrderData }, { where: { id: OrderId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteOrder(OrderId: number): Promise<any> {
    try {
      const findOrder: any = await OrderModel.findByPk(OrderId);
      if (!findOrder) {
        return { message: "Order doesn't exist" };
      }
      await OrderModel.destroy({ where: { id: OrderId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default OrderService;
