import CartModel from '@modules/cart/cart.model';
import { logger } from '@utils/logger';
import { FindOptions } from 'sequelize';
import CartItemModel from '../cart-item/cart.item.model';
import ProductModel from '../product/product.model';
import UserModel from '../user/user.model';
import { statusEnum } from './enum';

class CartService {
  public logFile = __filename;

  // public async findAllCart(): Promise<CartModel[] | { message: string }> {
  //   try {
  //     const options: FindOptions = {
  //       attributes: ['id', 'sessionId', 'token', 'status', 'fullName', 'mobile', 'email', 'address', 'content', 'createdAt', 'updatedAt', 'userId'],
  //     };
  //     const allCart = await CartModel.findAll(options);

  //     return allCart;
  //   } catch (error) {
  //     logger.error(`${this.logFile} ${error.message}`);
  //     return { message: error.message || 'Error' };
  //   }
  // }

  // public async findCartById(userId: number): Promise<CartModel | null | { message: string }> {
  //   try {
  //     const findCart = await CartModel.findOne({
  //       where: { userId },
  //       attributes: ['fullName', 'mobile', 'email', 'address', 'firstName', 'lastName', 'line', 'ward', 'district', 'province', 'country'],
  //     });
  //     if (!findCart) {
  //       return { message: "Cart doesn't exist" };
  //     }
  //     return findCart;
  //   } catch (error) {
  //     logger.error(`${this.logFile} ${error.message}`);
  //     return { message: error.message || 'Error' };
  //   }
  // }

  // public async updateCart(userId: number, CartData: any): Promise<CartModel | null | { message: string }> {
  //   try {
  //     const findCart = await CartModel.findOne({ where: { userId }, attributes: ['id'] });
  //     if (!findCart) {
  //       return { message: "Cart doesn't exist" };
  //     }
  //     await CartModel.update({ ...CartData }, { where: { id: findCart.id } });
  //     const res = CartModel.findOne({ where: { id: findCart.id } });
  //     return res;
  //   } catch (error) {
  //     logger.error(`${this.logFile} ${error.message}`);
  //     return { message: error.message || 'Error' };
  //   }
  // }

  // public async deleteCart(CartId: number): Promise<{ id: number } | { message: string }> {
  //   try {
  //     const findCart = await CartModel.findByPk(CartId);
  //     if (!findCart) {
  //       return { message: "Cart doesn't exist" };
  //     }
  //     await CartModel.destroy({ where: { id: CartId } });

  //     return { id: CartId };
  //   } catch (error) {
  //     logger.error(`${this.logFile} ${error.message}`);
  //     return { message: error.message || 'Error' };
  //   }
  // }
  public async countCart(id: number): Promise<number | any | { message: string }> {
    try {
      const cart = await CartModel.findOne({ where: { userId: id, status: statusEnum.New }, attributes: ['id'] });
      if (!cart) {
        return { message: "Cart doesn't exist" };
      }

      const count = await CartItemModel.count({ where: { cartId: cart.id } });

      return count;
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return { message: error.message || 'Error' };
    }
  }

  public async getPersonCart(userId: number): Promise<CartModel | null | { message: string }> {
    try {
      const cart = await CartModel.findOne({
        where: { userId: userId },
        attributes: ['sessionId', 'token', 'userId', 'id'],
        include: [
          {
            model: CartItemModel,
            attributes: ['id', 'productId', 'cartId', 'price', 'discount', 'quantity'],
            include: [
              {
                model: ProductModel,
                attributes: ['title', 'metaTitle', 'summary', 'type', 'price', 'discount', 'quantity', 'shop', 'content'],
                include: [
                  {
                    model: UserModel,
                    attributes: ['firstName', 'lastName'],
                  },
                ],
              },
            ],
          },
        ],
      });
      if (!cart) {
        return { message: "Cart doesn't exist" };
      }
      return cart;
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default CartService;
