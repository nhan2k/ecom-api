import { Request, Response } from 'express';
import ProductMetaService from './product.meta.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class ProductMetaController {
  private logFile = __filename;
  public ProductMetaService = new ProductMetaService();

  public getProductCategories = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllProductCategoriesData = await this.ProductMetaService.findAllProductCategories();
      if (!Array.isArray(findAllProductCategoriesData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllProductCategoriesData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, findAllProductCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductMetaById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductMetaId = Number(req.params.id);
      const findOneProductMetaData = await this.ProductMetaService.findProductMetaById(ProductMetaId);
      if (_.findKey(findOneProductMetaData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneProductMetaData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.OK, findOneProductMetaData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createProductMeta = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductMetaData: any = req.body;
      const createProductMetaData = await this.ProductMetaService.createProductMeta(ProductMetaData);
      if (_.findKey(createProductMetaData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createProductMetaData).sendResponse(res);
      }
      return new HttpResponse(HttpStatus.Created, createProductMetaData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateProductMeta = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductMetaId = Number(req.params.id);
      const ProductMetaData: any = req.body;
      const updateProductMetaData: any = await this.ProductMetaService.updateProductMeta(ProductMetaId, ProductMetaData);
      if (_.findKey(updateProductMetaData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateProductMetaData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateProductMetaData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteProductMeta = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductMetaId = Number(req.params.id);
      const deleteProductMetaData: any = await this.ProductMetaService.deleteProductMeta(ProductMetaId);
      if (_.findKey(deleteProductMetaData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteProductMetaData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteProductMetaData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductMetaController;
