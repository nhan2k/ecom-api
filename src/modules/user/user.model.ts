import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';

export class UserModel extends Model {
  declare id: number;
  declare firstName: string;
  declare lastName: string;
  declare mobile: string;
  declare email: string;
  declare passwordHash: string;
  declare admin: number;
  declare vendor: number;
  declare lastLogin: Date;
  declare intro: string;
  declare profile: string;
  declare content: JSON;
  declare createdAt: Date;
  declare updatedAt: Date;
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
    lastLogin: {
      type: DataTypes.DATE,
    },
    intro: {
      type: DataTypes.STRING,
      unique: true,
    },
    profile: {
      type: DataTypes.TEXT,
    },
    content: {
      type: DataTypes.JSON,
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
  },
  {
    tableName: 'user',
    sequelize,
    paranoid: false,
    deletedAt: false,
  },
);

export default UserModel;
