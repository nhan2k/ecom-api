import { compare, hash } from 'bcryptjs';
import AuthUtil from './auth.util';
import UserModel from '@/modules/user/users.model';
import { logger } from '@utils/logger';

class AuthService {
  public async signup(userData: any): Promise<{ message: string }> {
    try {
      const hashedPassword = await hash(userData.password, 10);
      await UserModel.create({ username: userData.username, password: hashedPassword });

      return { message: 'SignUp success' };
    } catch (error) {
      logger.error(error.message);
      return { message: 'SignUp fail' };
    }
  }

  public async login(userData: any): Promise<{ message: string } | { token: any }> {
    const findUser: any = await UserModel.findOne({ where: { email: userData.email } });

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) {
      return { message: 'Password not matching' };
    }

    const token = new AuthUtil().createToken(findUser);

    return token;
  }

  public async logout(userData: any): Promise<any> {
    const findUser: any = await UserModel.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) {
      return { message: `User doesn't exist` };
    }
    return findUser;
  }
}

export default AuthService;
