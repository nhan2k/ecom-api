import { hash } from 'bcryptjs';
import UserModel from '@modules/user/user.model';
import { logger } from '@utils/logger';
import { SALT } from '@config/env';
class UserService {
  public logFile = __filename;

  public async findAllUser(): Promise<UserModel[] | { message: string }> {
    try {
      const allUser = await UserModel.findAll();
      return allUser;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async findUserById(userId: number): Promise<UserModel | null | { message: string }> {
    try {
      const findUser = await UserModel.findByPk(userId, { attributes: ['firstName', 'lastName', 'mobile', 'email', 'profile', 'content', 'intro'] });
      if (!findUser) {
        return { message: "User doesn't exist" };
      }
      return findUser;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async createUser(userData: any): Promise<UserModel | { message: string }> {
    try {
      const { password, ...rest } = userData;
      const hashedPassword = await hash(password, Number(SALT));
      const res = await UserModel.create({ ...rest, passwordHash: hashedPassword });
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async updateUser(userId: number, userData: any): Promise<UserModel | null | { message: string }> {
    try {
      const { password, ...rest } = userData;

      if (password) {
        const hashedPassword = await hash(password, 10);
        await UserModel.update({ ...rest, password: hashedPassword }, { where: { id: userId } });
        const res = UserModel.findByPk(userId);
        return res;
      }
      await UserModel.update({ ...rest }, { where: { id: userId } });
      const res = UserModel.findByPk(userId);
      return res;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }

  public async deleteUser(userId: number): Promise<{ id: number } | { message: string }> {
    try {
      const findUser: any = await UserModel.findByPk(userId);
      if (!findUser) {
        return { message: "User doesn't exist" };
      }
      await UserModel.destroy({ where: { id: userId } });

      return { id: userId };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: error.message || 'Error' };
    }
  }
}

export default UserService;
