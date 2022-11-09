import ProductReviewModel from './product.review.model';
import { logger } from '@utils/logger';

class ProductReviewService {
  public logFile = __filename;

  public async findAllProductCategories(): Promise<ProductReviewModel[] | { message: string }> {
    try {
      const allProductReview = await ProductReviewModel.findAll();
      return allProductReview;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findProductReviewById(ProductReviewId: number): Promise<{ message: string } | ProductReviewModel | null> {
    try {
      const findProductReview = await ProductReviewModel.findByPk(ProductReviewId);
      if (!findProductReview) {
        return { message: "Cart Item doesn't exist" };
      }
      return findProductReview;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createProductReview(ProductReviewData: any): Promise<ProductReviewModel | { message: string }> {
    try {
      const res = await ProductReviewModel.create({ ...ProductReviewData });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateProductReview(ProductReviewId: number, ProductReviewData: any): Promise<ProductReviewModel | null | { message: string }> {
    try {
      const findProductReview: ProductReviewModel | null = await ProductReviewModel.findByPk(ProductReviewId);
      if (!findProductReview) {
        return { message: "ProductReview doesn't exist" };
      }
      await ProductReviewModel.update({ ...ProductReviewData }, { where: { id: ProductReviewId } });
      const res = ProductReviewModel.findByPk(ProductReviewId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteProductReview(ProductReviewId: number): Promise<{ message: string } | any> {
    try {
      const findProductReview: any = await ProductReviewModel.findByPk(ProductReviewId);
      if (!findProductReview) {
        return { message: "ProductReview doesn't exist" };
      }
      await ProductReviewModel.destroy({ where: { id: ProductReviewId } });

      return { id: ProductReviewId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default ProductReviewService;
