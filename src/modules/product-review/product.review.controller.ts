import { Request, Response } from 'express';
import ProductReviewService from './product.review.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class ProductReviewController {
  private logFile = __filename;
  public ProductReviewService = new ProductReviewService();

  public getProductCategories = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllProductCategoriesData = await this.ProductReviewService.findAllProductCategories();
      if (!Array.isArray(findAllProductCategoriesData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllProductCategoriesData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findAllProductCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductReviewById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductReviewId = Number(req.params.id);
      const findOneProductReviewData = await this.ProductReviewService.findProductReviewById(ProductReviewId);
      if (_.findKey(findOneProductReviewData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneProductReviewData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneProductReviewData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createProductReview = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductReviewData = req.body;
      const createProductReviewData = await this.ProductReviewService.createProductReview(ProductReviewData);
      if (_.findKey(createProductReviewData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createProductReviewData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, createProductReviewData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateProductReview = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductReviewId = Number(req.params.id);
      const ProductReviewData = req.body;
      const updateProductReviewData = await this.ProductReviewService.updateProductReview(ProductReviewId, ProductReviewData);
      if (_.findKey(updateProductReviewData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateProductReviewData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateProductReviewData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteProductReview = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductReviewId = Number(req.params.id);
      const deleteProductReviewData = await this.ProductReviewService.deleteProductReview(ProductReviewId);
      if (_.findKey(deleteProductReviewData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteProductReviewData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteProductReviewData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductReviewController;
