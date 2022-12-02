import CartItemModel from './cart.item.model';
import { logger } from '@utils/logger';
import CartModel from '../cart/cart.model';
import ProductModel from '../product/product.model';
import UserModel from '../user/user.model';
import _ from 'lodash';
import { actived } from './enum';

class CartItemService {
  public logFile = __filename;

  public async findAllCartItemsForShop(id: number): Promise<any | { message: string }> {
    try {
      const findCart = await CartModel.findOne({ where: { userId: id }, attributes: ['id'] });
      if (!findCart) {
        return { message: "Cart Item doesn't exist" };
      }
      const allCartItem: any = await CartItemModel.findAll({
        where: { cartId: findCart.id },
        attributes: ['price', 'discount', 'quantity', 'id'],
        include: [
          {
            model: ProductModel,
            attributes: ['content', 'quantity', 'price', 'title'],
            include: [
              {
                model: UserModel,
                attributes: ['intro'],
              },
            ],
          },
        ],
      });
      return _.chain(allCartItem)
        .groupBy(x => x.ProductModel.UserModel.intro)
        .value();
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findAllCartItemsForReviews(CartItemId: number): Promise<CartItemModel[] | null | { message: string }> {
    try {
      const findCart = await CartModel.findOne({ where: { userId: CartItemId }, attributes: ['id'] });
      if (!findCart) {
        return { message: "Cart doesn't exist" };
      }

      const findCartItem = await CartItemModel.findAll({
        where: { cartId: findCart.id },
        attributes: ['price', 'quantity'],
        include: [
          {
            model: ProductModel,
            attributes: ['title', 'price', 'discount'],
          },
        ],
      });

      return findCartItem;
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

  public async createCartItem(CartItemData: any, userId: number): Promise<CartItemModel | { message: string }> {
    try {
      const { productId } = CartItemData;
      const sku = `${productId}-${userId}`;
      const quantity = 1;
      const active = actived.Added;

      const cart = await CartModel.findOne({ where: { userId }, attributes: ['id'] });
      if (!cart) {
        return { message: "Cart doesn't exist" };
      }
      const cartId = cart.id;
      const product = await ProductModel.findByPk(productId, { attributes: ['price', 'discount'] });
      if (!product) {
        return { message: "Product doesn't exist" };
      }

      const res = await CartItemModel.create({ productId, cartId, sku, quantity, active, price: product.price, discount: product.discount });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error || 'Error' };
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

  public async updateQtyCartItem(CartItemId: number, CartItemData: any): Promise<CartModel[] | null | { message: string }> {
    try {
      const findCartItem = await CartItemModel.findByPk(CartItemId);
      if (!findCartItem) {
        return { message: "Cart Item doesn't exist" };
      }
      await CartItemModel.update({ ...CartItemData }, { where: { id: CartItemId } });
      const res = await CartItemModel.findByPk(CartItemId);

      if (!res) {
        return { message: "Cart Item doesn't exist" };
      }
      const cart = CartModel.findAll({ where: { id: res.id } });
      if (!cart) {
        return { message: "Cart Item doesn't exist" };
      }
      return cart;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default CartItemService;
