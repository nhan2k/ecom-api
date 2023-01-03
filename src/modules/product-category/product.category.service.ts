import ProductCategoryModel from './product.category.model';
import { logger } from '@utils/logger';
import { IProductCategoryData } from './type';
import ProductModel from '../product/product.model';
import CategoryModel from '../category/category.model';
class ProductCategoryService {
  public logFile = __filename;

  public async findAllProductCategories(): Promise<any | { message: string }> {
    try {
      const allProductCategory = await ProductCategoryModel.findAll();
      const allProduct = await ProductModel.findAll({ attributes: ['id', 'title'] });
      const allCategory = await CategoryModel.findAll({ attributes: ['id', 'title'] });
      return { allProductCategory, allProduct, allCategory };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findProductCategoryById(ProductCategoryId: number): Promise<ProductCategoryModel | null | { message: string }> {
    try {
      const findProductCategory = await ProductCategoryModel.findByPk(ProductCategoryId);
      if (!findProductCategory) {
        return { message: "Cart Item doesn't exist" };
      }
      return findProductCategory;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createProductCategory(ProductCategoryData: IProductCategoryData): Promise<ProductCategoryModel | { message: string }> {
    try {
      const { categoryId, productId } = ProductCategoryData;
      const record = await ProductCategoryModel.findOne({ where: { categoryId: categoryId, productId: productId } });
      if (record) {
        return { message: 'Record already exists' };
      }
      const res = await ProductCategoryModel.create({ categoryId, productId });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateProductCategory(
    ProductCategoryId: number,
    ProductCategoryData: any,
  ): Promise<ProductCategoryModel | null | { message: string }> {
    try {
      const findProductCategory = await ProductCategoryModel.findByPk(ProductCategoryId);
      if (!findProductCategory) {
        return { message: "ProductCategory doesn't exist" };
      }
      await ProductCategoryModel.update({ ...ProductCategoryData }, { where: { id: ProductCategoryId } });
      const res = await ProductCategoryModel.findByPk(ProductCategoryId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteProductCategory(ProductCategoryId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findProductCategory = await ProductCategoryModel.findByPk(ProductCategoryId);
      if (!findProductCategory) {
        return { message: "ProductCategory doesn't exist" };
      }
      await ProductCategoryModel.destroy({ where: { id: ProductCategoryId } });

      return { id: ProductCategoryId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default ProductCategoryService;
