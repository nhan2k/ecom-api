import { SECRET_KEY } from '@/config';
import { sign } from 'jsonwebtoken';

class AuthUtil {
  public createToken(user: any): any {
    const dataStoredInToken: any = { id: user.id };
    const secretKey: string = String(SECRET_KEY);
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthUtil;
