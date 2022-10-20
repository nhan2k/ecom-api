import { hash } from 'bcryptjs';
import UserModel from '@/modules/user/users.model';
import { HttpResponse, HttpStatus } from '@config/Http';
import { isEmpty } from '@/utils/util';

class UserService {
  public async findAllUser(): Promise<any[]> {
    const allUser: any[] = await UserModel.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<any> {
    if (isEmpty(userId)) throw new HttpResponse(HttpStatus.OK, 'UserId is empty');

    const findUser: any = await UserModel.findByPk(userId);
    if (!findUser) throw new HttpResponse(HttpStatus.OK, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: any): Promise<any> {
    if (isEmpty(userData)) throw new HttpResponse(HttpStatus.OK, 'userData is empty');

    const findUser: any = await UserModel.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpResponse(HttpStatus.OK, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: any = await UserModel.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: any): Promise<any> {
    if (isEmpty(userData)) throw new HttpResponse(HttpStatus.OK, 'userData is empty');

    const findUser: any = await UserModel.findByPk(userId);
    if (!findUser) throw new HttpResponse(HttpStatus.OK, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await UserModel.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: any = await UserModel.findByPk(userId);
    return updateUser;
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
