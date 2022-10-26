import { Request, Response } from 'express';
import ProductReviewService from './product.review.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TProductReview } from './product.review.interface';

class ProductReviewController {
  private logFile = __filename;
  public ProductReviewService = new ProductReviewService();

  public getProductCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const findAllProductCategoriesData: TProductReview[] = await this.ProductReviewService.findAllProductCategories();

      return new HttpResponse(HttpStatus.Created, findAllProductCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductReviewById = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductReviewId = Number(req.params.id);
      const findOneProductReviewData: TProductReview | null = await this.ProductReviewService.findProductReviewById(ProductReviewId);

      return new HttpResponse(HttpStatus.Created, findOneProductReviewData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createProductReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductReviewData: any = req.body;
      const createProductReviewData: { message: string } = await this.ProductReviewService.createProductReview(ProductReviewData);

      return new HttpResponse(HttpStatus.Created, createProductReviewData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateProductReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductReviewId = Number(req.params.id);
      const ProductReviewData: any = req.body;
      const updateProductReviewData: any = await this.ProductReviewService.updateProductReview(ProductReviewId, ProductReviewData);

      return new HttpResponse(HttpStatus.Created, updateProductReviewData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteProductReview = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductReviewId = Number(req.params.id);
      const deleteProductReviewData: any = await this.ProductReviewService.deleteProductReview(ProductReviewId);

      return new HttpResponse(HttpStatus.Created, deleteProductReviewData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductReviewController;
