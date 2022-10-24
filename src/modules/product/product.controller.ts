import { NextFunction, Request, Response } from 'express';
import ProductService from './product.service';

class ProductController {
  public productService = new ProductService();

  public getProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllProductsData: any[] = await this.productService.findAllProduct();

      res.status(200).json({ data: findAllProductsData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getProductById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductId = Number(req.params.id);
      const findOneProductData: any = await this.productService.findProductById(ProductId);

      res.status(200).json({ data: findOneProductData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductData: any = req.body;
      const createProductData: any = await this.productService.createProduct(ProductData);

      res.status(201).json({ data: createProductData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductId = Number(req.params.id);
      const ProductData: any = req.body;
      const updateProductData: any = await this.productService.updateProduct(ProductId, ProductData);

      res.status(200).json({ data: updateProductData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const ProductId = Number(req.params.id);
      const deleteProductData: any = await this.productService.deleteProduct(ProductId);

      res.status(200).json({ data: deleteProductData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
