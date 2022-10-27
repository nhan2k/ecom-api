import { Request, Response } from 'express';
import ProductTagService from './product.tag.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TProductTag } from './product.tag.interface';

class ProductTagController {
  private logFile = __filename;
  public ProductTagService = new ProductTagService();

  public getProductCategories = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllProductCategoriesData: TProductTag[] = await this.ProductTagService.findAllProductCategories();

      return new HttpResponse(HttpStatus.Created, findAllProductCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductTagById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductTagId = Number(req.params.id);
      const findOneProductTagData: TProductTag | null = await this.ProductTagService.findProductTagById(ProductTagId);

      return new HttpResponse(HttpStatus.Created, findOneProductTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createProductTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductTagData: any = req.body;
      const createProductTagData: { message: string } = await this.ProductTagService.createProductTag(ProductTagData);

      return new HttpResponse(HttpStatus.Created, createProductTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public updateProductTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductTagId = Number(req.params.id);
      const ProductTagData: any = req.body;
      const updateProductTagData: any = await this.ProductTagService.updateProductTag(ProductTagId, ProductTagData);

      return new HttpResponse(HttpStatus.Created, updateProductTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public deleteProductTag = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductTagId = Number(req.params.id);
      const deleteProductTagData: any = await this.ProductTagService.deleteProductTag(ProductTagId);

      return new HttpResponse(HttpStatus.Created, deleteProductTagData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductTagController;
