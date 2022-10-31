import ProductCategoryModel from './product.category.model';
import { logger } from '@utils/logger';
import ProductModel from '@modules/product/product.model';
import CategoryModel from '@modules/category/category.model';
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

  public async createProductCategory(ProductCategoryData: IProductCategoryData): Promise<{ isSuccess?: boolean; message: string }> {
    try {
      const { categoryId, productId } = ProductCategoryData;
      const product = await ProductModel.findByPk(productId);
      if (!product) {
        return { isSuccess: false, message: 'Not Found Product' };
      }
      const category = await CategoryModel.findByPk(categoryId);
      if (!category) {
        return { isSuccess: false, message: 'Not Found Category' };
      }

      await ProductCategoryModel.create({ ...ProductCategoryData });
      return { isSuccess: true, message: 'Success' };
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
