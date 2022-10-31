import { Request, Response } from 'express';
import ProductCategoryService from './product.category.service';
import { HttpResponse, HttpStatus } from '@config/Http';
import { logger } from '@utils/logger';
import { TProductCategory } from './product.category.interface';

class ProductCategoryController {
  private logFile = __filename;
  public ProductCategoryService = new ProductCategoryService();

  public getProductCategories = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const findAllProductCategoriesData: TProductCategory[] = await this.ProductCategoryService.findAllProductCategories();

      return new HttpResponse(HttpStatus.Created, findAllProductCategoriesData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public getProductCategoryById = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductCategoryId = Number(req.params.id);
      const findOneProductCategoryData: TProductCategory | null = await this.ProductCategoryService.findProductCategoryById(ProductCategoryId);

      return new HttpResponse(HttpStatus.Created, findOneProductCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };

  public createProductCategory = async (req: Request, res: Response): Promise<Response<any, Record<string, any>>> => {
    try {
      const ProductCategoryData: any = req.body;
      const createProductCategoryData: { isSuccess?: boolean; message: string } = await this.ProductCategoryService.createProductCategory(
        ProductCategoryData,
      );
      if (!createProductCategoryData.isSuccess) {
        return new HttpResponse(HttpStatus.BadRequest, { message: createProductCategoryData.message }).sendResponse(res);
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
      const updateProductCategoryData: any = await this.ProductCategoryService.updateProductCategory(ProductCategoryId, ProductCategoryData);

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

      return new HttpResponse(HttpStatus.Created, deleteProductCategoryData).sendResponse(res);
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return new HttpResponse(HttpStatus.BadRequest, error).sendResponse(res);
    }
  };
}

export default ProductCategoryController;
