import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@connections/databases';
export class CategoryModel extends Model {
  declare id: number;
  declare title: string;
  declare metaTitle: string;
  declare slug: string;
  declare content: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare parentId: number;
}

CategoryModel.init(
  {
    id: {
      autoIncrement: true,
      autoIncrementIdentity: true,
      primaryKey: true,
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
    parentId: {
      type: DataTypes.BIGINT,
    },
  },
  {
    tableName: 'category',
    sequelize,
    paranoid: false,
    deletedAt: false,
  },
);

export default CategoryModel;
