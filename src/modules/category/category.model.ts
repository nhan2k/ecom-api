import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class CategoryModel extends Model {
  declare parentId: number;
  declare title: string;
  declare metaTitle: string;
  declare slug: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date;
}

CategoryModel.init(
  {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
      type: DataTypes.BIGINT,
    },
    parentId: {
      type: DataTypes.BIGINT,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    metaTitle: {
      type: DataTypes.STRING,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
    tableName: 'category',
    sequelize,
    paranoid: true,
  },
);

export default CategoryModel;
