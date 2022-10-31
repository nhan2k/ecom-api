import OrderItemModel from './order.item.model';
import { logger } from '@utils/logger';

class OrderItemService {
  public logFile = __filename;

  public async findAllOrderItems(): Promise<OrderItemModel[]> {
    try {
      const allOrderItem: OrderItemModel[] = await OrderItemModel.findAll();
      return allOrderItem;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findOrderItemById(OrderItemId: number): Promise<OrderItemModel | null> {
    try {
      const findOrderItem: OrderItemModel | null = await OrderItemModel.findByPk(OrderItemId);
      return findOrderItem;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createOrderItem(OrderItemData: any): Promise<{ message: string }> {
    try {
      await OrderItemModel.create({ ...OrderItemData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateOrderItem(OrderItemId: number, OrderItemData: any): Promise<{ message: string }> {
    try {
      const findOrderItem: OrderItemModel | null = await OrderItemModel.findByPk(OrderItemId);
      if (!findOrderItem) {
        return { message: "OrderItem doesn't exist" };
      }
      await OrderItemModel.update({ ...OrderItemData }, { where: { id: OrderItemId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteOrderItem(OrderItemId: number): Promise<any> {
    try {
      const findOrderItem: any = await OrderItemModel.findByPk(OrderItemId);
      if (!findOrderItem) {
        return { message: "OrderItem doesn't exist" };
      }
      await OrderItemModel.destroy({ where: { id: OrderItemId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default OrderItemService;
