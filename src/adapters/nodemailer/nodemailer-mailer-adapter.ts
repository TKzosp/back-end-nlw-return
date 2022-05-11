import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '5da8ebf27eda68',
    pass: '6205b26da6b7d7'
  }
});

export class NodemailerMailAdapter implements MailAdapter{
  async sendMail({subject, body}: SendMailData) {
    await transport.sendMail({
      from: 'Equipe <oi@fidget.com',
      to: 'Rafael Felippe <rafaeltoth2408@gmail.com>',
      subject,
      html: body,
    });
    
  };

}