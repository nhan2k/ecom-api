import { SECRET_KEY, ISSUER, AUDIENCE, ACCESS_EXPIRESIN, REFRESH_EXPIRESIN, MAIL_USERNAME, MAIL_PASSWORD } from '@config/env';
import { sign, SignOptions } from 'jsonwebtoken';
import nodemailer from 'nodemailer';

class AuthUtil {
  public createToken({ vendor, admin, id }: { vendor: number; admin: number; id: number }): { accessToken: string; refreshToken: string } {
    const role = [
      {
        role: vendor === 1 ? 'VENDOR' : null,
      },
      {
        role: admin === 1 ? 'ADMIN' : null,
      },
    ];
    const payload = role.filter((element: { role: string | null }) => element.role !== null);

    const optionsAccess: SignOptions = { issuer: ISSUER, audience: AUDIENCE, expiresIn: ACCESS_EXPIRESIN, jwtid: String(id) };
    const optionsRefresh: SignOptions = { issuer: ISSUER, audience: AUDIENCE, expiresIn: REFRESH_EXPIRESIN, jwtid: String(id) };
    const secretKey: string = String(SECRET_KEY);

    return {
      accessToken: sign(payload[0], secretKey, optionsAccess),
      refreshToken: sign(payload[0], secretKey, optionsRefresh),
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
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log('Error ' + err);
      } else {
        console.log('Email sent successfully');
      }
    });
  }

  public makeid() {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 40; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

export default AuthUtil;
