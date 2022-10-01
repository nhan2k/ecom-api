import { compare, hash } from 'bcryptjs';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import AuthUtil from './auth.util';
import UserModel from '@/modules/user/users.model';

class AuthService {
  public async signup(userData: any): Promise<any> {
    const hashedPassword = await hash(userData.password, 10);
    const createUserData: UserModel = await UserModel.create({ username: userData.username, password: hashedPassword });

    const { username, email } = createUserData;

    return { username, email };
  }

  public async login(userData: any): Promise<{ findUser: any }> {
    const findUser: any = await UserModel.findOne({ where: { email: userData.email } });

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const tokenData = new AuthUtil().createToken(findUser);

    return { findUser };
  }

  public async logout(userData: any): Promise<any> {
    const findUser: any = await UserModel.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}

export default AuthService;
