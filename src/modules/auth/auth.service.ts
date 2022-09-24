import { compare, hash } from 'bcrypt';
import DB from '@/databases';
import { HttpException } from '@/exceptions/HttpException';
import { isEmpty } from '@/utils/util';
import AuthUtil from './auth.util';

class AuthService {
  public users = DB.Users;

  public async signup(userData: any): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: any = await this.users.findOne({ where: { username: userData.username } });
    if (findUser) throw new HttpException(409, `This username ${userData.username} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: any = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: any): Promise<{ cookie: string; findUser: any }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: any = await this.users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const tokenData = new AuthUtil().createToken(findUser);
    const cookie = new AuthUtil().createCookie(tokenData);

    return { cookie, findUser };
  }

  public async logout(userData: any): Promise<any> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: any = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }
}

export default AuthService;
