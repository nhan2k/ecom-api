import { Router } from 'express';
import AuthRoute from './auth/auth.routes';
import UserRoute from './user/user.routes';
import CartRoute from './cart/cart.routes';
import CartItemRoute from './cart-item/cart.item.routes';
import CategoryRoute from './category/category.routes';
import OrderRoute from './order/order.routes';
import OrderItemRoute from './order-item/order.item.routes';
import ProductRoute from './product/product.routes';
import ProductCategoryRoute from './product-category/product.category.routes';
import ProductMetaRoute from './product-meta/product.meta.routes';
import ProductReviewRoute from './product-review/product.review.routes';
import ProductTagRoute from './product-tag/product.tag.routes';
import TagRoute from './tag/tag.routes';
import TransactionRoute from './transaction/transaction.routes';

class ModuleRoute {
  public router: Router = Router();
  public authRoute: AuthRoute = new AuthRoute();
  public userRoute: UserRoute = new UserRoute();
  public cartRoute: CartRoute = new CartRoute();
  public cartItemRoute: CartItemRoute = new CartItemRoute();
  public categoryRoute: CategoryRoute = new CategoryRoute();
  public orderRoute: OrderRoute = new OrderRoute();
  public orderItemRoute: OrderItemRoute = new OrderItemRoute();
  public productRoute: ProductRoute = new ProductRoute();
  public productCategoryRoute: ProductCategoryRoute = new ProductCategoryRoute();
  public productMetaRoute: ProductMetaRoute = new ProductMetaRoute();
  public productReviewRoute: ProductReviewRoute = new ProductReviewRoute();
  public productTagRoute: ProductTagRoute = new ProductTagRoute();
  public tagRoute: TagRoute = new TagRoute();
  public transactionRoute: TransactionRoute = new TransactionRoute();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.use(this.authRoute.router);
    this.router.use(this.userRoute.router);
    this.router.use(this.cartRoute.router);
    this.router.use(this.cartItemRoute.router);
    this.router.use(this.categoryRoute.router);
    this.router.use(this.orderRoute.router);
    this.router.use(this.orderItemRoute.router);
    this.router.use(this.productRoute.router);
    this.router.use(this.productCategoryRoute.router);
    this.router.use(this.productMetaRoute.router);
    this.router.use(this.productReviewRoute.router);
    this.router.use(this.productTagRoute.router);
    this.router.use(this.tagRoute.router);
    this.router.use(this.transactionRoute.router);
  }
}

export default ModuleRoute;
