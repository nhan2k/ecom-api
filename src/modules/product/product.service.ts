import { hash } from 'bcryptjs';
import ProductModel from '@modules/product/product.model';
import { HttpResponse, HttpStatus } from '@config/Http';
import { isEmpty } from '@/utils/util';

class ProductService {
  public async findAllProduct(): Promise<any[]> {
    const allProduct: any[] = await ProductModel.findAll();
    return allProduct;
  }

  public async findProductById(ProductId: number): Promise<any> {
    if (isEmpty(ProductId)) throw new HttpResponse(HttpStatus.OK, 'ProductId is empty');

    const findProduct: any = await ProductModel.findByPk(ProductId);
    if (!findProduct) throw new HttpResponse(HttpStatus.OK, "Product doesn't exist");

    return findProduct;
  }

  public async createProduct(ProductData: any): Promise<any> {
    if (isEmpty(ProductData)) throw new HttpResponse(HttpStatus.OK, 'ProductData is empty');

    const findProduct: any = await ProductModel.findOne({ where: { email: ProductData.email } });
    if (findProduct) throw new HttpResponse(HttpStatus.OK, `This email ${ProductData.email} already exists`);

    const hashedPassword = await hash(ProductData.password, 10);
    const createProductData: any = await ProductModel.create({ ...ProductData, password: hashedPassword });
    return createProductData;
  }

  public async updateProduct(ProductId: number, ProductData: any): Promise<any> {
    if (isEmpty(ProductData)) throw new HttpResponse(HttpStatus.OK, 'ProductData is empty');

    const findProduct: any = await ProductModel.findByPk(ProductId);
    if (!findProduct) throw new HttpResponse(HttpStatus.OK, "Product doesn't exist");

    const hashedPassword = await hash(ProductData.password, 10);
    await ProductModel.update({ ...ProductData, password: hashedPassword }, { where: { id: ProductId } });

    const updateProduct: any = await ProductModel.findByPk(ProductId);
    return updateProduct;
  }

  public async deleteProduct(ProductId: number): Promise<any> {
    if (isEmpty(ProductId)) throw new HttpResponse(HttpStatus.OK, "Product doesn't existId");

    const findProduct: any = await ProductModel.findByPk(ProductId);
    if (!findProduct) throw new HttpResponse(HttpStatus.OK, "Product doesn't exist");

    await ProductModel.destroy({ where: { id: ProductId } });

    return findProduct;
  }
}

export default ProductService;
