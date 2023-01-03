import { Request, Response } from 'express';
import ProductCategoryService from './product.category.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class ProductCategoryController {
  private logFile = __filename;
  public ProductCategoryService = new ProductCategoryService();

  public getProductCategories = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllProductCategoriesData = await this.ProductCategoryService.findAllProductCategories();

      return new HttpResponse(HttpStatus.OK, findAllProductCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductCategoryById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductCategoryId = Number(req.params.id);
      const findOneProductCategoryData = await this.ProductCategoryService.findProductCategoryById(ProductCategoryId);
      if (_.get(findOneProductCategoryData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneProductCategoryData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneProductCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createProductCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductCategoryData = req.body;
      const createProductCategoryData = await this.ProductCategoryService.createProductCategory(ProductCategoryData);
      if (_.get(createProductCategoryData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createProductCategoryData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, createProductCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateProductCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductCategoryId = Number(req.params.id);
      const ProductCategoryData: any = req.body;
      const updateProductCategoryData = await this.ProductCategoryService.updateProductCategory(ProductCategoryId, ProductCategoryData);
      if (_.get(updateProductCategoryData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateProductCategoryData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateProductCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteProductCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductCategoryId = Number(req.params.id);
      const deleteProductCategoryData: any = await this.ProductCategoryService.deleteProductCategory(ProductCategoryId);
      if (_.get(deleteProductCategoryData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteProductCategoryData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteProductCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductCategoryController;
