import ProductTagModel from './product.tag.model';
import { logger } from '@utils/logger';

class ProductTagService {
  public logFile = __filename;

  public async findAllProductCategories(): Promise<ProductTagModel[]> {
    try {
      const allProductTag: ProductTagModel[] = await ProductTagModel.findAll();
      return allProductTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findProductTagById(ProductTagId: number): Promise<ProductTagModel | null> {
    try {
      const findProductTag: ProductTagModel | null = await ProductTagModel.findByPk(ProductTagId);
      return findProductTag;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createProductTag(ProductTagData: any): Promise<{ message: string }> {
    try {
      console.log(ProductTagData);
      await ProductTagModel.create({ ...ProductTagData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateProductTag(ProductTagId: number, ProductTagData: any): Promise<{ message: string }> {
    try {
      const findProductTag: ProductTagModel | null = await ProductTagModel.findByPk(ProductTagId);
      if (!findProductTag) {
        return { message: "ProductTag doesn't exist" };
      }
      await ProductTagModel.update({ ...ProductTagData }, { where: { id: ProductTagId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteProductTag(ProductTagId: number): Promise<any> {
    try {
      const findProductTag: any = await ProductTagModel.findByPk(ProductTagId);
      if (!findProductTag) {
        return { message: "ProductTag doesn't exist" };
      }
      await ProductTagModel.destroy({ where: { id: ProductTagId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default ProductTagService;
