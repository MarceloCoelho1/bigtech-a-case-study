import { IMailService } from '../../core/services/IMailService';
import * as nodemailer from 'nodemailer'
import { env } from '../../env';
import { EmailNotSent } from '../../core/errors/EmailNotSentError';

export class MailService implements IMailService {
  async sendMail(data: { to: string; subject: string; body: string }): Promise<void> {

    let mailOptions = {
        from: 'Marcelo',
        to: data.to,
        subject: data.subject,
        html: data.body
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