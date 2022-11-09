import CartModel from '@modules/cart/cart.model';
import { logger } from '@utils/logger';
import { FindOptions } from 'sequelize';
import { cartStatusMap } from './enum';

class CartService {
  public logFile = __filename;

  public async findAllCart(): Promise<CartModel[] | { message: string }> {
    try {
      const options: FindOptions = {
        attributes: [
          'id',
          'userId',
          'sessionId',
          'token',
          'status',
          'firstName',
          'middleName',
          'lastName',
          'mobile',
          'email',
          'line1',
          'city',
          'province',
          'country',
          'createdAt',
          'content',
          'updatedAt',
        ],
      };
      const allCart = await CartModel.findAll(options);

      return allCart;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findCartById(CartId: number): Promise<CartModel | null | { message: string }> {
    try {
      const findCart = await CartModel.findByPk(CartId);
      if (!findCart) {
        return { message: "Cart doesn't exist" };
      }
      return findCart;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createCart(CartData: any): Promise<CartModel | { message: string }> {
    try {
      const res = await CartModel.create({ ...CartData });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateCart(CartId: number, CartData: any): Promise<CartModel | null | { message: string }> {
    try {
      const findCart: CartModel | null = await CartModel.findByPk(CartId);
      if (!findCart) {
        return { message: "Cart doesn't exist" };
      }
      await CartModel.update({ ...CartData }, { where: { id: CartId } });
      const res = CartModel.findOne({ where: { id: CartId } });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteCart(CartId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findCart = await CartModel.findByPk(CartId);
      if (!findCart) {
        return { message: "Cart doesn't exist" };
      }
      await CartModel.destroy({ where: { id: CartId } });

      return { id: CartId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default CartService;
