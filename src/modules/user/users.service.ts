import { hash } from 'bcrypt';
import DB from '@/databases';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';

class UserService {
  public users = DB.Users;

  public async findAllUser(): Promise<any[]> {
    const allUser: any[] = await this.users.findAll();
    return allUser;
  }

  public async findUserById(userId: number): Promise<any> {
    if (isEmpty(userId)) throw new HttpException(400, 'UserId is empty');

    const findUser: any = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: any): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: any = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: any = await this.users.create({ ...userData, password: hashedPassword });
    return createUserData;
  }

  public async updateUser(userId: number, userData: any): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: any = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const hashedPassword = await hash(userData.password, 10);
    await this.users.update({ ...userData, password: hashedPassword }, { where: { id: userId } });

    const updateUser: any = await this.users.findByPk(userId);
    return updateUser;
  }

  public async deleteUser(userId: number): Promise<any> {
    if (isEmpty(userId)) throw new HttpException(400, "User doesn't existId");

    const findUser: any = await this.users.findByPk(userId);
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    await this.users.destroy({ where: { id: userId } });

    return findUser;
  }
}

export default UserService;
