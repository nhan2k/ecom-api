import OrderModel from './order.model';
import { logger } from '@utils/logger';
import OrderItemModel from '@modules/order-item/order.item.model';
import ProductModel from '@modules/product/product.model';
import _ from 'lodash';

class OrderService {
  public logFile = __filename;

  public async findAllOrders(): Promise<any | { message: string }> {
    try {
      const orders = OrderModel.findAll();

      return orders;
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

  public async countOrder(id: number): Promise<number | { message: string }> {
    try {
      let products = await ProductModel.findAll({
        where: { userId: id },
        attributes: ['id'],
      });

      let orders: any[] = [];
      for (let index = 0; index < products.length; index++) {
        const element = products[index].id;
        let order = await OrderItemModel.findAll({
          where: { productId: element },
          attributes: ['price', 'discount', 'quantity', 'createdAt'],
          include: [
            {
              model: OrderModel,
              attributes: [
                'fullName',
                'address',
                'sessionId',
                'firstName',
                'lastName',
                'mobile',
                'email',
                'line',
                'ward',
                'district',
                'province',
                'country',
              ],
            },
            {
              model: ProductModel,
              attributes: ['title'],
            },
          ],
        });
        orders = [...orders, ...order];
      }

      return orders.length;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default OrderService;
