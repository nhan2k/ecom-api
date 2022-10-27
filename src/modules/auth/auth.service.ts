import { compare, hash } from 'bcryptjs';
import AuthUtil from './auth.util';
import UserModel from '@/modules/user/user.model';
import { logger } from '@utils/logger';
import { SALT } from '@config/env';

class AuthService {
  public async signup(userData: any): Promise<{ message: string }> {
    try {
      const { email, password } = userData;
      const hashedPassword = await hash(password, Number(SALT));
      await UserModel.create({ email, passwordHash: hashedPassword });

      return { message: 'SignUp success' };
    } catch (error) {
      logger.error(error.message);
      return { message: error.message };
    }
  }

  public async login(email: string): Promise<{ message: string } | { accessToken: string; refreshToken: string }> {
    try {
      const findUser: UserModel | null = await UserModel.findOne({ where: { email: email }, attributes: ['vendor', 'admin'] });
      if (!findUser) {
        return { message: 'Not found user' };
      }
      const { vendor, admin } = findUser;
      const { accessToken, refreshToken } = new AuthUtil().createToken({ vendor, admin });

      return { accessToken, refreshToken };
    } catch (error) {
      return error;
    }
  }
}

export default AuthService;
