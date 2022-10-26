import { Request, Response } from 'express';
import ProductService from './product.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TProduct } from './product.interface';

class ProductController {
  private logFile = __filename;
  public ProductService = new ProductService();

  public getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const findAllProductsData: TProduct[] = await this.ProductService.findAllProducts();

      return new HttpResponse(HttpStatus.Created, findAllProductsData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductId = Number(req.params.id);
      const findOneProductData: TProduct | null = await this.ProductService.findProductById(ProductId);

      return new HttpResponse(HttpStatus.Created, findOneProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductData: any = req.body;
      const createProductData: { message: string } = await this.ProductService.createProduct(ProductData);

      return new HttpResponse(HttpStatus.Created, createProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductId = Number(req.params.id);
      const ProductData: any = req.body;
      const updateProductData: any = await this.ProductService.updateProduct(ProductId, ProductData);

      return new HttpResponse(HttpStatus.Created, updateProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductId = Number(req.params.id);
      const deleteProductData: any = await this.ProductService.deleteProduct(ProductId);

      return new HttpResponse(HttpStatus.Created, deleteProductData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductController;
