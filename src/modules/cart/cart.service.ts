import CartModel from '@modules/cart/cart.model';
import { logger } from '@utils/logger';

class CartService {
  public logFile = __filename;

  public async findAllCart(): Promise<CartModel[]> {
    try {
      const allCart: CartModel[] = await CartModel.findAll();
      return allCart;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findCartById(CartId: number): Promise<CartModel | null> {
    try {
      const findCart: CartModel | null = await CartModel.findByPk(CartId);
      return findCart;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createCart(CartData: any): Promise<{ message: string }> {
    try {
      await CartModel.create({ ...CartData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateCart(CartId: number, CartData: any): Promise<{ message: string }> {
    try {
      const findCart: CartModel | null = await CartModel.findByPk(CartId);
      if (!findCart) {
        return { message: "Cart doesn't exist" };
      }
      await CartModel.update({ ...CartData }, { where: { id: CartId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteCart(CartId: number): Promise<any> {
    try {
      const findCart: any = await CartModel.findByPk(CartId);
      if (!findCart) {
        return { message: "Cart doesn't exist" };
      }
      await CartModel.destroy({ where: { id: CartId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default CartService;
