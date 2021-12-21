import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as handlebars from 'handlebars';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMailForgotPassword(obj: any){
    const filePath = path.join(
      process.cwd() + '/src/mail/template/forgot-password-mail.html',
    );
    // const source = fs.readFileSync(filePath, 'utf-8').toString();
    // const template = handlebars.compile(source);
    await this.mailerService.sendMail({
      to: obj.to,
      subject: 'Quên mật khẩu ',
      template: './forgot-password-mail.html',
      context: {
        ...obj,
      },
    });
  }
}