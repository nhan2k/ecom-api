import { SECRET_KEY, ISSUER, AUDIENCE, ACCESS_EXPIRESIN, REFRESH_EXPIRESIN, MAIL_USERNAME, MAIL_PASSWORD } from '@config/env';
import { sign, SignOptions } from 'jsonwebtoken';
import nodemailer from 'nodemailer';

class AuthUtil {
  public createToken({ vendor, admin }: { vendor: number; admin: number }): { accessToken: string; refreshToken: string } {
    const payload: { vendor: number; admin: number } = { vendor, admin };
    const optionsAccess: SignOptions = { issuer: ISSUER, audience: AUDIENCE, expiresIn: ACCESS_EXPIRESIN };
    const optionsRefresh: SignOptions = { issuer: ISSUER, audience: AUDIENCE, expiresIn: REFRESH_EXPIRESIN };
    const secretKey: string = String(SECRET_KEY);

    return {
      accessToken: sign(payload, secretKey, optionsAccess),
      refreshToken: sign(payload, secretKey, optionsRefresh),
    };
  }

  public async sendMail(mailTo: string) {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: String(MAIL_USERNAME),
        pass: String(MAIL_PASSWORD),
      },
    });
    let mailOptions = {
      from: String(MAIL_USERNAME),
      to: mailTo,
      subject: 'Reset Password',
      text: `This is the link to reset password `,
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error ' + err);
      } else {
        console.log('Email sent successfully');
      }
    });
  }
}

export default AuthUtil;
