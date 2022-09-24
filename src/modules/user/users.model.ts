import { Sequelize, DataTypes, Model } from 'sequelize';

export class UserModel extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare phoneNumber: string;
  declare status: number;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
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
        allowNull: true,
        type: DataTypes.STRING,
      },
      firstName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      lastName: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      phoneNumber: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      status: {
        allowNull: true,
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'user',
      sequelize,
    },
  );

  return UserModel;
}
