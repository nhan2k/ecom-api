import ProductCategoryModel from './product.category.model';
import { logger } from '@utils/logger';

class ProductCategoryService {
  public logFile = __filename;

  public async findAllProductCategories(): Promise<ProductCategoryModel[]> {
    try {
      const allProductCategory: ProductCategoryModel[] = await ProductCategoryModel.findAll();
      return allProductCategory;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findProductCategoryById(ProductCategoryId: number): Promise<ProductCategoryModel | null> {
    try {
      const findProductCategory: ProductCategoryModel | null = await ProductCategoryModel.findByPk(ProductCategoryId);
      return findProductCategory;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createProductCategory(ProductCategoryData: any): Promise<{ message: string }> {
    try {
      console.log(ProductCategoryData);
      await ProductCategoryModel.create({ ...ProductCategoryData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateProductCategory(ProductCategoryId: number, ProductCategoryData: any): Promise<{ message: string }> {
    try {
      const findProductCategory: ProductCategoryModel | null = await ProductCategoryModel.findByPk(ProductCategoryId);
      if (!findProductCategory) {
        return { message: "ProductCategory doesn't exist" };
      }
      await ProductCategoryModel.update({ ...ProductCategoryData }, { where: { id: ProductCategoryId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteProductCategory(ProductCategoryId: number): Promise<any> {
    try {
      const findProductCategory: any = await ProductCategoryModel.findByPk(ProductCategoryId);
      if (!findProductCategory) {
        return { message: "ProductCategory doesn't exist" };
      }
      await ProductCategoryModel.destroy({ where: { id: ProductCategoryId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default ProductCategoryService;
