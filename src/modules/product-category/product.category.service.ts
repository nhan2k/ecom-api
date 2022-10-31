import ProductCategoryModel from './product.category.model';
import { logger } from '@utils/logger';
import { IProductCategoryData } from './type';
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

  public async createProductCategory(ProductCategoryData: IProductCategoryData): Promise<{ message: string }> {
    try {
      const { categoryId, productId } = ProductCategoryData;
      await ProductCategoryModel.create({ categoryId, productId });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message };
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
      return { message: error.message };
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
      return { message: error.message };
    }
  }
}

export default ProductCategoryService;
