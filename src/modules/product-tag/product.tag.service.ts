import ProductTagModel from './product.tag.model';
import { logger } from '@utils/logger';
import ProductModel from '@modules/product/product.model';
import TagModel from '@modules/tag/tag.model';

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

  public async createProductTag(ProductTagData: any): Promise<{ isSuccess?: boolean; message: string }> {
    try {
      const { tagId, productId } = ProductTagData;
      const product = await ProductModel.findByPk(productId);
      if (!product) {
        return { isSuccess: false, message: 'Not Found Product' };
      }
      const tag = await TagModel.findByPk(tagId);
      if (!tag) {
        return { isSuccess: false, message: 'Not Found Tag' };
      }
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
