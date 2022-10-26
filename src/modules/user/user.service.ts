import { hash } from 'bcryptjs';
import UserModel from '@modules/user/user.model';
import { logger } from '@utils/logger';

class UserService {
  public logFile = __filename;

  public async findAllUser(): Promise<UserModel[]> {
    try {
      const allUser: UserModel[] = await UserModel.findAll();
      return allUser;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return [];
    }
  }

  public async findUserById(userId: number): Promise<UserModel | null> {
    try {
      const findUser: UserModel | null = await UserModel.findByPk(userId);
      return findUser;
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return null;
    }
  }

  public async createUser(userData: any): Promise<{ message: string }> {
    try {
      const findUser: UserModel | null = await UserModel.findOne({ where: { email: userData.email } });
      if (findUser) {
        return { message: `This email ${userData.email} already exists` };
      }
      const hashedPassword = await hash(userData.password, 10);
      await UserModel.create({ ...userData, passwordHash: hashedPassword });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async updateUser(userId: number, userData: any): Promise<{ message: string }> {
    try {
      const findUser: UserModel | null = await UserModel.findByPk(userId);
      if (!findUser) {
        return { message: "User doesn't exist" };
      }
      if (userData.password) {
        const hashedPassword = await hash(userData.password, 10);
        await UserModel.update({ ...userData, password: hashedPassword }, { where: { id: userId } });
        return { message: 'Success' };
      }
      await UserModel.update({ ...userData }, { where: { id: userId } });
      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }

  public async deleteUser(userId: number): Promise<any> {
    try {
      const findUser: any = await UserModel.findByPk(userId);
      if (!findUser) {
        return { message: "User doesn't exist" };
      }
      await UserModel.destroy({ where: { id: userId } });

      return { message: 'Success' };
    } catch (error) {
      logger.error(`${this.logFile} ${error.message}`);
      return { message: 'Failure' };
    }
  }
}

export default UserService;
