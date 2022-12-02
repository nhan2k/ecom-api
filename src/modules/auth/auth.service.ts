import { hash } from 'bcryptjs';
import AuthUtil from './auth.util';
import UserModel from '@modules/user/user.model';
import UserService from '@modules/user/user.service';
import { logger } from '@utils/logger';
import { SALT } from '@config/env';
import { UpdateOptions } from 'sequelize';
import CartModel from '../cart/cart.model';
import { v4 as uuidv4 } from 'uuid';

class AuthService {
  public logFile = __filename;

  public async signUp(userData: any, isVendor?: boolean): Promise<any | { message: string }> {
    try {
      const { email, password } = userData;
      const hashedPassword = await hash(password, Number(SALT));
      if (isVendor) {
        const res = await UserModel.create({ email, passwordHash: hashedPassword, vendor: 1 });
        const vendor = await UserModel.findByPk(res.id, { attributes: ['email', 'firstName', 'lastName', 'mobile'] });
        return vendor;
      }
      const res = await UserModel.create({ email, passwordHash: hashedPassword });

      const newUser = await UserModel.findOne({ where: { email: res.email }, attributes: ['id', 'email', 'firstName', 'lastName', 'mobile'] });
      if (newUser) {
        await CartModel.create({
          sessionId: uuidv4(),
          token: new AuthUtil().makeid(),
          userId: newUser.id,
        });
      }

      return newUser;
    } catch (error) {
      logger.error({ message: error.message || 'Error' });
      return { message: { message: error.message || 'Error' } };
    }
  }

  public async signIn(email: string): Promise<{ message: string } | { accessToken: string; refreshToken: string; role: string }> {
    try {
      const findUser = await UserModel.findOne({ where: { email: email }, attributes: ['vendor', 'admin', 'id'] });
      if (!findUser) {
        return { message: 'Not found user' };
      }
      if (findUser.admin === 1 || findUser.vendor === 1) {
        return { message: 'Not found user' };
      }
      const { vendor, admin, id } = findUser;
      const { accessToken, refreshToken } = new AuthUtil().createToken({ vendor, admin, id });
      await new UserService().updateUser(findUser.id, { lastLogin: new Date() });

      let role = findUser.vendor === 1 ? 'VENDOR' : findUser.admin === 1 ? 'ADMIN' : 'USER';
      return { accessToken, refreshToken, role };
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return { message: error.message || 'Error' };
    }
  }

  public async signInVendor(email: string): Promise<{ message: string } | { accessToken: string; refreshToken: string; role: string }> {
    try {
      const findUser = await UserModel.findOne({ where: { email: email }, attributes: ['vendor', 'admin', 'id'] });
      if (!findUser) {
        return { message: 'Not found user' };
      }
      if (findUser.admin === 0 && findUser.vendor === 0) {
        return { message: 'Not found Vendor' };
      }
      const { vendor, admin, id } = findUser;
      const { accessToken, refreshToken } = new AuthUtil().createToken({ vendor, admin, id });
      await new UserService().updateUser(findUser.id, { lastLogin: new Date() });

      let role = findUser.vendor === 1 ? 'VENDOR' : findUser.admin === 1 ? 'ADMIN' : 'USER';
      return { accessToken, refreshToken, role };
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return { message: error.message || 'Error' };
    }
  }

  public async sendLinkReset(emailName: string): Promise<{ data: string } | { message: string }> {
    try {
      const findUser = await UserModel.findOne({ where: { email: emailName }, attributes: ['email'] });
      if (!findUser) {
        return { message: 'Not found user' };
      }
      await new AuthUtil().sendMail(findUser.email);
      return { data: 'Send link to gmail, please check!' };
    } catch (error) {
      logger.error(`${this.logFile} ${error}`);
      return { message: error.message || 'Error' };
    }
  }

  public async resetPassword(emailName: string, newPassword: string): Promise<{ message: string }> {
    try {
      const findUser = await UserModel.findOne({ where: { email: emailName }, attributes: ['email'] });
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
      return { message: error.message || 'Error' };
    }
  }
  public async updateUser(userId: number, userData: any): Promise<UserModel | null | { message: string }> {
    try {
      const { password, ...rest } = userData;

      if (password) {
        const hashedPassword = await hash(password, 10);
        await UserModel.update({ ...rest, password: hashedPassword }, { where: { id: userId } });
        const res = UserModel.findByPk(userId, { attributes: ['firstName', 'lastName', 'mobile', 'email', 'intro', 'content'] });
        return res;
      }
      await UserModel.update({ ...rest }, { where: { id: userId } });
      const res = UserModel.findByPk(userId, { attributes: ['firstName', 'lastName', 'mobile', 'email', 'intro', 'content'] });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default AuthService;
