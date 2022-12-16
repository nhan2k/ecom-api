import { Request, Response } from 'express';
import ProductReviewService from './product.review.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class ProductReviewController {
  private logFile = __filename;
  public ProductReviewService = new ProductReviewService();

  public getProductReview = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllProductReviewData = await this.ProductReviewService.findAllProductReview();
      if (!Array.isArray(findAllProductReviewData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllProductReviewData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findAllProductReviewData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductReviewById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductReviewId = Number(req.params.id);
      const findOneProductReviewData = await this.ProductReviewService.findProductReviewById(ProductReviewId);
      if (_.get(findOneProductReviewData, 'message')) {
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
      if (_.get(createProductReviewData, 'message')) {
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
      if (_.get(updateProductReviewData, 'message')) {
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
      if (_.get(deleteProductReviewData, 'message')) {
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
