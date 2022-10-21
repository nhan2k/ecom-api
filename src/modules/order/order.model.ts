import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class OrderModel extends Model {
  declare id: number;
  declare userId: number;
  declare sessionId: string;
  declare token: string;
  declare status: number;
  declare subTotal: number;
  declare itemDiscount: number;
  declare tax: number;
  declare shipping: number;
  declare total: number;
  declare promo: string;
  declare discount: number;
  declare grandTotal: number;
  declare firstName: string;
  declare middleName: string;
  declare lastName: string;
  declare mobile: string;
  declare email: string;
  declare line1: string;
  declare line2: string;
  declare city: string;
  declare province: string;
  declare country: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

OrderModel.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    status: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    subTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    itemDiscount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    tax: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    shipping: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    promo: {
      type: DataTypes.STRING(50),
    },
    discount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    grandTotal: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
    },
    firstName: {
      type: DataTypes.STRING(50),
    },
    middleName: {
      type: DataTypes.STRING(50),
    },
    lastName: {
      type: DataTypes.STRING(50),
    },
    mobile: {
      type: DataTypes.STRING(15),
    },
    email: {
      type: DataTypes.STRING(50),
    },
    line1: {
      type: DataTypes.STRING(50),
    },
    line2: {
      type: DataTypes.STRING(50),
    },
    city: {
      type: DataTypes.STRING(50),
    },
    province: {
      type: DataTypes.STRING(50),
    },
    country: {
      type: DataTypes.STRING(50),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    content: {
      type: DataTypes.TEXT,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'order',
    sequelize,
    paranoid: true,
  },
);

export default OrderModel;
