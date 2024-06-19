import { IMailService } from '../../core/domain/adapters/mail.interface';
import * as nodemailer from 'nodemailer'
import { env } from "../../shared/env";
import { EmailNotSent } from '../../core/domain/errors/EmailNotSent';

export class MailService implements IMailService {
  async sendMail(data: { to: string; subject: string; body: string }): Promise<void> {

    let mailOptions = {
        from: 'Marcelo',
        to: data.to,
        subject: data.subject,
        html: `
            <p><strong>Recovery your password!</strong>!</p>
            <a href="http://localhost:3333/auth/resetpassword/?token=${data.body}">Click here!</a>
        `
    }
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: env.EMAIL_USERNAME,
            pass: env.EMAIL_KEY
        },
    });
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          throw new EmailNotSent()
        }
    }); 

  }
}
