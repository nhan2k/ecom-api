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
      if (_.get(findOneProductData, 'message')) {
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
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const ProductData = req.body;

      const createProductData = await this.ProductService.createProduct(ProductData, id);
      if (_.get(createProductData, 'message')) {
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
      if (_.get(updateProductData, 'message')) {
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
      if (_.get(deleteProductData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, deleteProductData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, deleteProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public countProducts = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      let id = req.user ? req.user['id'] : null;
      if (!id) {
        return new HttpResponse(HttpStatus.BadRequest, { message: 'Not Found User' }).sendResponse(res);
      }
      const countProductData = await this.ProductService.countProduct(id);
      if (_.get(countProductData, 'message')) {
        return new HttpResponse(HttpStatus.BadRequest, countProductData).sendResponse(res);
      }

      return new HttpResponse(HttpStatus.OK, countProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductController;
