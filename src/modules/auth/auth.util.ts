import { SECRET_KEY, ISSUER, AUDIENCE, ACCESS_EXPIRESIN, REFRESH_EXPIRESIN } from '@config/env';
import { sign, SignOptions } from 'jsonwebtoken';

class AuthUtil {
  public createToken({ vendor, admin }: { vendor: number; admin: number }): { accessToken: string; refreshToken: string } {
    const payload: any = { vendor, admin };
    const optionsAccess: SignOptions = { issuer: ISSUER, audience: AUDIENCE, expiresIn: ACCESS_EXPIRESIN };
    const optionsRefresh: SignOptions = { issuer: ISSUER, audience: AUDIENCE, expiresIn: REFRESH_EXPIRESIN };
    const secretKey: string = String(SECRET_KEY);

    return {
      accessToken: sign(payload, secretKey, optionsAccess),
      refreshToken: sign(payload, secretKey, optionsRefresh),
    };
  }
}

export default AuthUtil;
