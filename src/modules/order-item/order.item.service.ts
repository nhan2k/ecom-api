import OrderItemModel from './order.item.model';
import { logger } from '@utils/logger';
import TransactionModel from '@modules/transaction/transaction.model';
import { statusEnum } from '@modules/transaction/enum';

class OrderItemService {
  public logFile = __filename;

  public async findAllOrderItems(): Promise<OrderItemModel[] | { message: string }> {
    try {
      const allOrderItem = await OrderItemModel.findAll();
      return allOrderItem;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findOrderItemById(OrderItemId: number): Promise<OrderItemModel | null | { message: string }> {
    try {
      const findOrderItem = await OrderItemModel.findByPk(OrderItemId);
      if (!findOrderItem) {
        return { message: "Order Item doesn't exist" };
      }
      return findOrderItem;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createOrderItem(OrderItemData: any): Promise<OrderItemModel | { message: string }> {
    try {
      const res = await OrderItemModel.create({ ...OrderItemData });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateOrderItem(OrderItemId: number, OrderItemData: any): Promise<OrderItemModel | null | { message: string }> {
    try {
      const findOrderItem = await OrderItemModel.findByPk(OrderItemId);
      if (!findOrderItem) {
        return { message: "OrderItem doesn't exist" };
      }
      await OrderItemModel.update({ ...OrderItemData }, { where: { id: OrderItemId } });
      await TransactionModel.update({ ...OrderItemData }, { where: { id: OrderItemId } });
      const res = OrderItemModel.findByPk(OrderItemId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteOrderItem(OrderItemId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findOrderItem = await OrderItemModel.findByPk(OrderItemId);
      if (!findOrderItem) {
        return { message: "OrderItem doesn't exist" };
      }
      await OrderItemModel.destroy({ where: { id: OrderItemId } });

      return { id: OrderItemId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default OrderItemService;
