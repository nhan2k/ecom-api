import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';

export class CartItemModel extends Model {
  declare id: number;
  declare productId: number;
  declare cartId: number;
  declare sku: string;
  declare price: number;
  declare discount: number;
  declare quantity: number;
  declare active: number;
  declare createdAt: Date;
  declare content: string;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

CartItemModel.init(
  {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    productId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    cartId: {
      allowNull: false,
      type: DataTypes.BIGINT,
    },
    sku: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
    active: {
      type: DataTypes.SMALLINT,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    content: {
      type: DataTypes.TEXT,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'cart_item',
    sequelize,
    paranoid: true,
  },
);

export default CartItemModel;
