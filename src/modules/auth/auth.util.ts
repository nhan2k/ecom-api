import { SECRET_KEY } from '@config/env';
import { sign } from 'jsonwebtoken';

class AuthUtil {
  public createToken(user: any): any {
    const dataStoredInToken: any = { id: user.id };
    const secretKey: string = String(SECRET_KEY);
    const expiresIn: number = 60 * 60;

    return { token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }
}

export default AuthUtil;
