import CartItemModel from './cart.item.model';
import { logger } from '@utils/logger';

class CartItemService {
  public logFile = __filename;

  public async findAllCartItems(): Promise<CartItemModel[] | { message: string }> {
    try {
      const allCartItem = await CartItemModel.findAll();
      return allCartItem;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findCartItemById(CartItemId: number): Promise<CartItemModel | null | { message: string }> {
    try {
      const findCartItem = await CartItemModel.findByPk(CartItemId);
      if (!findCartItem) {
        return { message: "Cart Item doesn't exist" };
      }
      return findCartItem;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createCartItem(CartItemData: any): Promise<CartItemModel | { message: string }> {
    try {
      const res = await CartItemModel.create({ ...CartItemData });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateCartItem(CartItemId: number, CartItemData: any): Promise<CartItemModel | null | { message: string }> {
    try {
      const findCartItem = await CartItemModel.findByPk(CartItemId);
      if (!findCartItem) {
        return { message: "Cart Item doesn't exist" };
      }
      await CartItemModel.update({ ...CartItemData }, { where: { id: CartItemId } });
      const res = CartItemModel.findByPk(CartItemId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteCartItem(CartItemId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findCartItem = await CartItemModel.findByPk(CartItemId);
      if (!findCartItem) {
        return { message: "Cart Item doesn't exist" };
      }
      await CartItemModel.destroy({ where: { id: CartItemId } });

      return { id: CartItemId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default CartItemService;
