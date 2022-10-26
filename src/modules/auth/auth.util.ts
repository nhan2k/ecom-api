import { SECRET_KEY } from '@config/env';
import { sign } from 'jsonwebtoken';

class AuthUtil {
  public createToken(user: { id: number }): { accessToken: string; refreshToken: string } {
    const dataStoredInToken: any = { id: user.id };
    const secretKey: string = String(SECRET_KEY);
    const expiresIn: string = '7d';
    const expiresInRefresh: string = '30d';

    return {
      accessToken: sign(dataStoredInToken, secretKey, { expiresIn }),
      refreshToken: sign(dataStoredInToken, secretKey, { expiresIn: expiresInRefresh }),
    };
  }
}

export default AuthUtil;
