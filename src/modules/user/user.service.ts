import { hash } from 'bcryptjs';
import UserModel from '@modules/user/user.model';
import { HttpResponse, HttpStatus } from '@config/Http';
import { isEmpty } from '@/utils/util';

class UserService {
  public async findAllUser(): Promise<UserModel[]> {
    const allUser: any[] = await UserModel.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<UserModel> {
    if (isEmpty(userId)) throw new HttpResponse(HttpStatus.OK, 'UserId is empty');

    const findUser: any = await UserModel.findByPk(userId);
    if (!findUser) throw new HttpResponse(HttpStatus.OK, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: any): Promise<{ message: string }> {
    const findUser: UserModel | null = await UserModel.findOne({ where: { email: userData.email } });
    if (findUser) {
      return { message: `This email ${userData.email} already exists` };
    }
    const hashedPassword = await hash(userData.password, 10);
    await UserModel.create({ ...userData, passwordHash: hashedPassword });
    return { message: 'Success' };
  }

  public async updateUser(userId: number, userData: any): Promise<{ message: string }> {
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
  }

  public async deleteUser(userId: number): Promise<any> {
    if (isEmpty(userId)) throw new HttpResponse(HttpStatus.OK, "User doesn't existId");

    const findUser: any = await UserModel.findByPk(userId);
    if (!findUser) throw new HttpResponse(HttpStatus.OK, "User doesn't exist");

    await UserModel.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
