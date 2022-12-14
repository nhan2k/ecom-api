import { hash } from 'bcryptjs';
import AuthUtil from './auth.util';
import UserModel from '@modules/user/user.model';
import UserService from '@modules/user/user.service';
import { logger } from '@utils/logger';
import { SALT } from '@config/env';
import { UpdateOptions } from 'sequelize';
import CartModel from '../cart/cart.model';
import { v4 as uuidv4 } from 'uuid';
import { statusEnum } from '@modules/cart/enum';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY } from '@config/env';

class AuthService {
  public logFile = __filename;

  public async signUp(userData: any, isAdmin?: boolean): Promise<any | { message: string }> {
    try {
      const { email, password, firstName, lastName, mobile } = userData;
      const hashedPassword = await hash(password, Number(SALT));

      const [newUser, created] = await UserModel.findOrCreate({
        where: { email },
        defaults: {
          firstName,
          lastName,
          mobile,
          email,
          passwordHash: hashedPassword,
          admin: isAdmin ? 1 : 0,
          vendor: isAdmin ? 0 : 1,
        },
      });
      if (!created) {
        return { message: 'Email created' };
      }

      if (newUser && !isAdmin) {
        await CartModel.create({
          sessionId: uuidv4(),
          token: sign({ id: newUser.id }, String(SECRET_KEY)),
          userId: newUser.id,
          firstName,
          lastName,
          mobile,
          status: statusEnum.New,
          email,
        });
      }

      return newUser;
    } catch (error) {
      logger.error({ message: error.message || 'Error' });
      return { message: { message: error.message || 'Error' } };
    }
  }

  public async signIn(email: string, isAdmin?: boolean): Promise<{ message: string } | { accessToken: string; refreshToken: string; role: string }> {
    try {
      const findUser = await UserModel.findOne({ where: { email: email }, attributes: ['vendor', 'admin', 'id'] });
      if (!findUser) {
        return { message: 'Not found user' };
      }
      if (findUser.vendor === 1 && isAdmin) {
        return { message: 'Not found user' };
      }
      if (findUser.admin === 1 && !isAdmin) {
        return { message: 'Not found user' };
      }
      const { vendor, admin, id } = findUser;
      const { accessToken, refreshToken } = new AuthUtil().createToken({ vendor, admin, id });
      await new UserService().updateUser(findUser.id, { lastLogin: new Date() });

      let role = findUser.vendor === 1 ? 'VENDOR' : 'ADMIN';
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
      const { intro, content, ...restt } = rest;
      await CartModel.update({ ...restt }, { where: { userId: userId } });
      const res = UserModel.findByPk(userId, { attributes: ['firstName', 'lastName', 'mobile', 'email', 'intro', 'content'] });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default AuthService;
