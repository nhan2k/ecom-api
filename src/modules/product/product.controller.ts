import { Request, Response } from 'express';
import ProductService from './product.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import _ from 'lodash';

class ProductController {
  private logFile = __filename;
  public ProductService = new ProductService();

  public getProducts = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllProductsData = await this.ProductService.findAllProducts();
      if (!Array.isArray(findAllProductsData)) {
        return new HttpResponse(HttpStatus.BadRequest, findAllProductsData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findAllProductsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductId = Number(req.params.id);
      const findOneProductData = await this.ProductService.findProductById(ProductId);
      if (_.findKey(findOneProductData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, findOneProductData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, findOneProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createProduct = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductData = req.body;
      const createProductData = await this.ProductService.createProduct(ProductData);
      if (_.findKey(createProductData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, createProductData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, createProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateProduct = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductId = Number(req.params.id);
      const ProductData = req.body;
      const updateProductData = await this.ProductService.updateProduct(ProductId, ProductData);
      if (_.findKey(updateProductData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, updateProductData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.Created, updateProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteProduct = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductId = Number(req.params.id);
      const deleteProductData = await this.ProductService.deleteProduct(ProductId);
      if (_.findKey(deleteProductData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteProductData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductController;
