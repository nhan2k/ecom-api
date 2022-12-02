import { logger } from '@utils/logger';
import CartItemModel from '../cart-item/cart.item.model';
import CartModel from '../cart/cart.model';
import OrderItemModel from '../order-item/order.item.model';
import OrderModel from '../order/order.model';
import { actived } from '@modules/cart-item/enum';
import TransactionModel from '../transaction/transaction.model';
import AuthUtil from '../auth/auth.util';

class CategoryService {
  public logFile = __filename;

  public async checkout(userId: number, data: any): Promise<any | { message: string }> {
    try {
      const findCart = await CartModel.findOne({ where: { userId: userId }, attributes: ['id', 'sessionId', 'token', 'userId'] });
      if (!findCart) {
        return { message: "Cart doesn't exist" };
      }
      const cartItems = await CartItemModel.findAll({
        where: { cartId: findCart.id },
        attributes: ['productId', 'sku', 'price', 'discount', 'quantity'],
      });

      const order = await OrderModel.create({ sessionId: findCart.sessionId, token: findCart.token, userId, ...data });
      cartItems.map(async e => {
        await OrderItemModel.create({
          productId: e.productId,
          orderId: order.id,
          sku: e.sku,
          price: e.price,
          discount: e.discount,
          quantity: e.quantity,
        });
      });

      await CartItemModel.update({ active: actived.Pending }, { where: { active: actived.Ordered, cartId: findCart.id } });
      const code = new AuthUtil().makeid();
      const type = 0;
      const mode = 0;
      const status = 0;

      const transaction = await TransactionModel.create({ userId: userId, orderId: order.id, code, type, mode, status });

      return transaction;
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default CategoryService;
