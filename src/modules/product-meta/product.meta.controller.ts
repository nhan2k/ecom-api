import { Request, Response } from 'express';
import ProductMetaService from './product.meta.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TProductMeta } from './product.meta.interface';

class ProductMetaController {
  private logFile = __filename;
  public ProductMetaService = new ProductMetaService();

  public getProductCategories = async (req: Request, res: Response): Promise<void> => {
    try {
      const findAllProductCategoriesData: TProductMeta[] = await this.ProductMetaService.findAllProductCategories();

      return new HttpResponse(HttpStatus.Created, findAllProductCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductMetaById = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductMetaId = Number(req.params.id);
      const findOneProductMetaData: TProductMeta | null = await this.ProductMetaService.findProductMetaById(ProductMetaId);

      return new HttpResponse(HttpStatus.Created, findOneProductMetaData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createProductMeta = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductMetaData: any = req.body;
      const createProductMetaData: { message: string } = await this.ProductMetaService.createProductMeta(ProductMetaData);

      return new HttpResponse(HttpStatus.Created, createProductMetaData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateProductMeta = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductMetaId = Number(req.params.id);
      const ProductMetaData: any = req.body;
      const updateProductMetaData: any = await this.ProductMetaService.updateProductMeta(ProductMetaId, ProductMetaData);

      return new HttpResponse(HttpStatus.Created, updateProductMetaData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteProductMeta = async (req: Request, res: Response): Promise<void> => {
    try {
      const ProductMetaId = Number(req.params.id);
      const deleteProductMetaData: any = await this.ProductMetaService.deleteProductMeta(ProductMetaId);

      return new HttpResponse(HttpStatus.Created, deleteProductMetaData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductMetaController;
