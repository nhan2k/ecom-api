import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phoneNumber: string;
  declare status: number;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

UserModel.init(
  {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phoneNumber: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.INTEGER,
    },
    createdAt: {
      type: DataTypes.DATE,
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
  },
);

export default UserModel;
