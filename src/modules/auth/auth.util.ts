import { SECRET_KEY } from '@/config';
import { User } from '@/modules/user/users.interface';
import { sign } from 'jsonwebtoken';

class AuthUtil {
  public createToken(user: User): any {
    const dataStoredInToken: any = { id: user.id };
    const secretKey: string = String(SECRET_KEY);
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: any): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }
}

export default AuthUtil;
