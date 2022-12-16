import { logger } from '@utils/logger';
import CartItemModel from '../cart-item/cart.item.model';
import CartModel from '../cart/cart.model';
import OrderItemModel from '../order-item/order.item.model';
import OrderModel from '../order/order.model';
import TransactionModel from '../transaction/transaction.model';
import { statusEnum as statusEnumCart } from '@modules/cart/enum';
import { activeEnum as activeEnum } from '@modules/cart-item/enum';
import { statusEnum as statusEnumOrderItem } from '@modules/order-item/enum';
import { codeEnum, modeEnum, statusEnum as statusEnumTransaction, typeEnum } from '@modules/transaction/enum';
import { v4 as uuidv4 } from 'uuid';
import { statusEnum } from '@modules/cart/enum';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config/env';
import ProductModel from '../product/product.model';

class CategoryService {
  public logFile = __filename;

  public async checkout(userId: number, data: any): Promise<any | { message: string }> {
    try {
      const findCart = await CartModel.findOne({
        where: { userId: userId, status: statusEnumCart.New },
        attributes: [
          'id',
          'sessionId',
          'token',
          'userId',
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
      });
      if (!findCart) {
        return { message: "Cart doesn't exist" };
      }
      const cartItems = await CartItemModel.findAll({
        where: { cartId: findCart.id },
        attributes: ['productId', 'sku', 'price', 'discount', 'quantity'],
      });

      const { isPaid, subTotal, itemDiscount, tax, shipping, total, promo, discount, grandTotal } = data;
      const order = await OrderModel.create({
        sessionId: findCart.sessionId,
        token: findCart.token,
        userId,
        subTotal,
        firstName: findCart.firstName,
        lastName: findCart.lastName,
        mobile: findCart.mobile,
        email: findCart.email,
        line: findCart.line,
        ward: findCart.ward,
        district: findCart.district,
        province: findCart.province,
        country: findCart.country,
        itemDiscount,
        tax,
        shipping,
        total,
        promo,
        discount,
        grandTotal,
      });
      cartItems.map(async e => {
        await OrderItemModel.create({
          productId: e.productId,
          orderId: order.id,
          sku: e.sku,
          price: e.price,
          discount: e.discount,
          quantity: e.quantity,
          status: isPaid ? statusEnumOrderItem.Paid : statusEnumOrderItem.Checkout,
        });
        const product = await ProductModel.findOne({ where: { id: e.productId }, attributes: ['quantity'] });
        if (!product) {
          return { message: "Product doesn't exist" };
        }
        await ProductModel.update({ quantity: product.quantity - e.quantity }, { where: { id: e.productId } });
      });

      const { paymentId } = data;
      const code = paymentId;
      const mode = paymentId === 0 ? modeEnum.Offline : modeEnum.Online;
      const type = paymentId === 0 ? typeEnum.debit : typeEnum.credit;
      const status = statusEnumTransaction.New;

      await TransactionModel.create({ userId, orderId: order.id, code, type, mode, status });
      await CartModel.update(
        {
          status: statusEnumCart.Checkout,
        },
        { where: { id: findCart.id } },
      );
      await CartModel.create({
        sessionId: uuidv4(),
        token: sign({ id: userId }, String(SECRET_KEY)),
        userId: userId,
        firstName: findCart.firstName,
        lastName: findCart.lastName,
        mobile: findCart.mobile,
        email: findCart.email,
        line: findCart.line,
        ward: findCart.ward,
        district: findCart.district,
        province: findCart.province,
        country: findCart.country,
        status: statusEnum.New,
      });

      return { orderId: order.id };
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default CategoryService;
