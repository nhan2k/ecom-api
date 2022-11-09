import { Request, Response } from 'express';
import ProductTagService from './product.tag.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TProductTag } from './product.tag.interface';
import _ from 'lodash';

class ProductTagController {
  private logFile = __filename;
  public ProductTagService = new ProductTagService();

  public getProductCategories = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllProductCategoriesData = await this.ProductTagService.findAllProductCategories();
      if (!Array.isArray(findAllProductCategoriesData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllProductCategoriesData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findAllProductCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public getProductTagById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductTagId = Number(req.params.id);
      const findOneProductTagData = await this.ProductTagService.findProductTagById(ProductTagId);
      if (_.findKey(findOneProductTagData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneProductTagData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneProductTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public createProductTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductTagData = req.body;
      const createProductTagData = await this.ProductTagService.createProductTag(ProductTagData);
      if (_.findKey(createProductTagData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createProductTagData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, createProductTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public updateProductTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductTagId = Number(req.params.id);
      const ProductTagData = req.body;
      const updateProductTagData = await this.ProductTagService.updateProductTag(ProductTagId, ProductTagData);
      if (_.findKey(updateProductTagData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateProductTagData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateProductTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };

  public deleteProductTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductTagId = Number(req.params.id);
      const deleteProductTagData: any = await this.ProductTagService.deleteProductTag(ProductTagId);
      if (_.findKey(deleteProductTagData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteProductTagData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteProductTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error.message).sendResponse(res);
    }
  };
}

export default ProductTagController;
