import { Request, Response, Router } from 'express';
import ModuleRoute from '@/modules/index.routes';
import { signup } from '@modules/auth/auth.middleware';
import passport from 'passport';
import UserModel from '@modules/user/user.model';
import AuthController from '@modules/auth/auth.controller';
import PassportAuthen from '@middlewares/passport.middleware';
import ProductController from '@/modules/product/product.controller';
import CategoryController from '@/modules/category/category.controller';

class IndexRoute {
  public path = '/api/v1';
  public router = Router();
  public moduleRoute = new ModuleRoute();
  public logFile = __filename;
  public authController = new AuthController();
  public passportAuthen = new PassportAuthen();

  public productController = new ProductController();
  public categoryController = new CategoryController();

  constructor() {
    this.initializeRoutes();

    passport.serializeUser(function (user: UserModel, done) {
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    });

    passport.deserializeUser((user: UserModel, done) => {
      if (!user) {
        return done(null, false);
      } else {
        done(null, user);
      }
    });
  }

  private initializeRoutes() {
    this.router.get('/', (req: Request, res: Response) => {
      return res.status(200).json({ message: 'App is running' });
    });

    // Client
    this.router.get('/client/product', this.productController.getProducts);
    this.router.get(`/client/product/:id(\\d+)`, this.productController.getProductById);
    this.router.get('/category', this.categoryController.getCategories);

    this.router.post('/signup', signup, this.authController.signUp);
    this.router.post('/signup/admin', signup, this.authController.signUpAdmin);
    this.router.get('/link-reset/:email', this.authController.sendLinkReset);
    this.router.post(`${this.path}`, passport.authenticate('local', { failureRedirect: '/signin' }), this.authController.signIn);
    this.router.post(`${this.path}/admin`, passport.authenticate('local', { failureRedirect: '/signin' }), this.authController.signInVendor);
    this.router.get('/signin', this.authController.signInFail);
    this.router.use(`${this.path}`, passport.authenticate('jwt', { session: false }), this.moduleRoute.router);
  }
}

export default IndexRoute;
