import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class CartModel extends Model {
  declare id: number;
  declare sessionId: string;
  declare token: string;
  declare status: number;
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

CartModel.init(
  {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    sessionId: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
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
      type: DataTypes.STRING(50),
    },
    ward: {
      type: DataTypes.STRING(50),
    },
    district: {
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
    content: {
      type: DataTypes.JSON,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    userId: {
      type: DataTypes.BIGINT,
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
    fullName: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
      set(value) {
        throw new Error('Do not try to set the `fullName` value!');
      },
    },
  },
  {
    tableName: 'cart',
    sequelize,
    paranoid: false,
    deletedAt: false,
  },
);

export default CartModel;
