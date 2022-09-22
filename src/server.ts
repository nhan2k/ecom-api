import App from '@/app';
import AuthRoute from '@/modules/auth/auth.routes';
import UsersRoute from '@/modules/user/users.routes';
import IndexRoute from '@/routes/index.routes';
import validateEnv from '@/utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute()]);

app.listen();
