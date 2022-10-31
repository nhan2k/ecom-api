import CartItemModel from './cart.item.model';
import { logger } from '@utils/logger';

class CartItemService {
  public logFile = __filename;

  public async findAllCartItems(): Promise<CartItemModel[]> {
    try {
      const allCartItem: CartItemModel[] = await CartItemModel.findAll();
      return allCartItem;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findCartItemById(CartItemId: number): Promise<CartItemModel | null> {
    try {
      const findCartItem: CartItemModel | null = await CartItemModel.findByPk(CartItemId);
      return findCartItem;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createCartItem(CartItemData: any): Promise<{ message: string }> {
    try {
      await CartItemModel.create({ ...CartItemData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateCartItem(CartItemId: number, CartItemData: any): Promise<{ message: string }> {
    try {
      const findCartItem: CartItemModel | null = await CartItemModel.findByPk(CartItemId);
      if (!findCartItem) {
        return { message: "CartItem doesn't exist" };
      }
      await CartItemModel.update({ ...CartItemData }, { where: { id: CartItemId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteCartItem(CartItemId: number): Promise<any> {
    try {
      const findCartItem: any = await CartItemModel.findByPk(CartItemId);
      if (!findCartItem) {
        return { message: "CartItem doesn't exist" };
      }
      await CartItemModel.destroy({ where: { id: CartItemId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default CartItemService;
