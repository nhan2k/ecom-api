import { hash } from 'bcryptjs';
import AuthUtil from './auth.util';
import UserModel from '@modules/user/user.model';
import UserService from '@modules/user/user.service';
import { logger } from '@utils/logger';
import { SALT } from '@config/env';
import { UpdateOptions } from 'sequelize';

class AuthService {
  public logFile = __filename;

  public async signUp(userData: any): Promise<{ message: string }> {
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

  public async signIn(email: string): Promise<{ message: string } | { accessToken: string; refreshToken: string }> {
    try {
      const findUser: UserModel | null = await UserModel.findOne({ where: { email: email }, attributes: ['vendor', 'admin', 'id'] });
      if (!findUser) {
        return { message: 'Not found user' };
      }
      const { vendor, admin } = findUser;
      const { accessToken, refreshToken } = new AuthUtil().createToken({ vendor, admin });
      await new UserService().updateUser(findUser.id, { lastLogin: new Date() });
      return { accessToken, refreshToken };
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return error;
    }
  }

  public async sendLinkReset(emailName: string): Promise<{ message: string }> {
    try {
      const findUser: UserModel | null = await UserModel.findOne({ where: { email: emailName }, attributes: ['email'] });
      if (!findUser) {
        return { message: 'Not found user' };
      }
      // await new AuthUtil().sendMail(findUser.email);
      await new AuthUtil().sendMail(findUser.email);
      return { message: 'Send link to gmail, please check!' };
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return error;
    }
  }

  public async resetPassword(emailName: string, newPassword: string): Promise<{ message: string }> {
    try {
      const findUser: UserModel | null = await UserModel.findOne({ where: { email: emailName }, attributes: ['email'] });
      if (!findUser) {
        return { message: 'Not found user' };
      }
      const { email } = findUser;
      const newPass = await hash(newPassword, Number(SALT));
      const value: {
        [x: string]: any;
      } = { passwordHash: newPass };
      const options: UpdateOptions<any> = { where: { email: email } };
      await UserModel.update(value, options);

      return { message: 'Password reset successful, please login again' };
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return error;
    }
  }
}

export default AuthService;
