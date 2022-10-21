import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class UserModel extends Model {
  declare id: number;
  declare firstName: string;
  declare middleName: string;
  declare lastName: string;
  declare mobile: string;
  declare email: string;
  declare passwordHash: string;
  declare admin: number;
  declare vendor: number;
  declare registeredAt: Date;
  declare lastLogin: Date;
  declare intro: string;
  declare profile: string;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

UserModel.init(
  {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
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
    passwordHash: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    admin: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    vendor: {
      type: DataTypes.SMALLINT,
      allowNull: false,
      defaultValue: 0,
    },
    registeredAt: {
      type: DataTypes.DATE,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
    intro: {
      type: DataTypes.STRING,
    },
    profile: {
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
    tableName: 'user',
    sequelize,
    paranoid: true,
    createdAt: 'registeredAt',
  },
);

export default UserModel;
