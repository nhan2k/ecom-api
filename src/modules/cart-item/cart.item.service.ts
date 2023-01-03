import CartItemModel from './cart.item.model';
import { logger } from '@utils/logger';
import CartModel from '../cart/cart.model';
import ProductModel from '../product/product.model';
import UserModel from '../user/user.model';
import _ from 'lodash';
import { activeEnum } from './enum';
import { statusEnum } from '@modules/cart/enum';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config/env';

class CartItemService {
  public logFile = __filename;

  public async findAllCartItemsForShop(id: number): Promise<any | { message: string }> {
    try {
      const findCart = await CartModel.findOne({ where: { userId: id, status: statusEnum.New }, attributes: ['id'] });
      if (!findCart) {
        return { message: "Cart Item doesn't exist" };
      }
      const allCartItem: any = await CartItemModel.findAll({
        where: { cartId: findCart.id },
        attributes: ['price', 'discount', 'quantity', 'id', 'content'],
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
      return allCartItem.sort();
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findAllCartItemsForReviews(CartItemId: number): Promise<CartItemModel[] | null | { message: string }> {
    try {
      const findCart = await CartModel.findOne({ where: { userId: CartItemId, status: statusEnum.New }, attributes: ['id'] });
      if (!findCart) {
        return { message: "Cart doesn't exist" };
      }

      const findCartItem = await CartItemModel.findAll({
        where: { cartId: findCart.id },
        attributes: ['price', 'quantity', 'content'],
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
      let cartId: number | null = null;
      const cart = await CartModel.findOne({ where: { userId, status: statusEnum.New }, attributes: ['id'] });
      if (!cart) {
        const findCart = await CartModel.findOne({
          where: {
            userId,
            status: {
              [Op.ne]: statusEnum.New,
            },
          },
          attributes: ['firstName', 'lastName', 'mobile', 'line', 'ward', 'district', 'province', 'country'],
        });
        if (!findCart) {
          return { message: "Cart doesn't exist" };
        }
        const newCart = await CartModel.create({
          sessionId: uuidv4(),
          token: sign({ id: userId }, String(SECRET_KEY)),
          userId: userId,
          firstName: findCart.firstName,
          lastName: findCart.lastName,
          mobile: findCart.mobile,
          status: statusEnum.New,
        });
        cartId = newCart.id;
      }

      if (!cartId) {
        cartId = cart ? cart.id : null;
      }

      const { productId, meta } = CartItemData;
      const product = await ProductModel.findByPk(productId, { attributes: ['price', 'discount'] });
      if (!product) {
        return { message: "Product doesn't exist" };
      }

      const sku = `${productId}/${cartId}/${userId}`;
      const quantity = 1;
      const active = activeEnum.existed;
      const checkItemExist = await CartItemModel.findOne({
        where: {
          productId,
          cartId,
          active,
        },
        attributes: ['quantity'],
      });
      if (checkItemExist) {
        await CartItemModel.update({ quantity: checkItemExist.quantity + 1 }, { where: { productId, cartId, active } });
        const res = await CartItemModel.findOne({
          where: {
            productId,
            cartId,
          },
        });
        if (!res) {
          return { message: "Cart doesn't exist" };
        }
        return res;
      }
      const res = await CartItemModel.create({
        productId,
        cartId,
        sku,
        quantity,
        active,
        price: product.price,
        discount: product.discount,
        content: meta,
      });
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
