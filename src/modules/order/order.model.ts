import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class OrderModel extends Model {
  declare id: number;
  declare sessionId: string;
  declare token: string;
  declare subTotal: number;
  declare itemDiscount: number;
  declare tax: number;
  declare shipping: number;
  declare total: number;
  declare promo: string;
  declare discount: number;
  declare grandTotal: number;
  declare firstName: string;
  declare lastName: string;
  declare mobile: string;
  declare email: string;
  declare line: string;
  declare ward: string;
  declare district: string;
  declare province: string;
  declare country: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare userId: number;
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
    lastName: {
      type: DataTypes.STRING(50),
    },
    mobile: {
      type: DataTypes.STRING(15),
    },
    email: {
      type: DataTypes.STRING(50),
    },
    line: {
      type: DataTypes.STRING,
    },
    ward: {
      type: DataTypes.STRING,
    },
    district: {
      type: DataTypes.STRING,
    },
    province: {
      type: DataTypes.STRING(50),
    },
    country: {
      type: DataTypes.STRING(50),
    },
    content: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      },
    },
    address: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.line} ${this.ward} ${this.district} ${this.province} ${this.country}`;
      },
      set(value) {
        throw new Error('Do not try to set the `address` value!');
      },
    },
  },
  {
    tableName: 'order',
    sequelize,
    paranoid: false,
  },
);

export default OrderModel;
