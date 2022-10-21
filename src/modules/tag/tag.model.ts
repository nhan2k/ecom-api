import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class TagModel extends Model {
  declare id: number;
  declare title: string;
  declare metaTitle: string;
  declare slug: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

TagModel.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      autoIncrementIdentity: true,
      type: DataTypes.BIGINT,
    },
    title: {
      type: DataTypes.STRING(75),
      allowNull: false,
    },
    metaTitle: {
      type: DataTypes.STRING(100),
    },
    slug: {
      type: DataTypes.STRING(100),
      allowNull: false,
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
    deletedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: 'tag',
    sequelize,
    paranoid: true,
  },
);

export default TagModel;
