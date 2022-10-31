import ProductReviewModel from './product.review.model';
import { logger } from '@utils/logger';

class ProductReviewService {
  public logFile = __filename;

  public async findAllProductCategories(): Promise<ProductReviewModel[]> {
    try {
      const allProductReview: ProductReviewModel[] = await ProductReviewModel.findAll();
      return allProductReview;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findProductReviewById(ProductReviewId: number): Promise<ProductReviewModel | null> {
    try {
      const findProductReview: ProductReviewModel | null = await ProductReviewModel.findByPk(ProductReviewId);
      return findProductReview;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createProductReview(ProductReviewData: any): Promise<{ message: string }> {
    try {
      await ProductReviewModel.create({ ...ProductReviewData });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateProductReview(ProductReviewId: number, ProductReviewData: any): Promise<{ message: string }> {
    try {
      const findProductReview: ProductReviewModel | null = await ProductReviewModel.findByPk(ProductReviewId);
      if (!findProductReview) {
        return { message: "ProductReview doesn't exist" };
      }
      await ProductReviewModel.update({ ...ProductReviewData }, { where: { id: ProductReviewId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteProductReview(ProductReviewId: number): Promise<any> {
    try {
      const findProductReview: any = await ProductReviewModel.findByPk(ProductReviewId);
      if (!findProductReview) {
        return { message: "ProductReview doesn't exist" };
      }
      await ProductReviewModel.destroy({ where: { id: ProductReviewId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default ProductReviewService;
