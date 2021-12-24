import * as fs from 'fs';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import * as handlebars from 'handlebars';
import { OtpEmail } from './mail-context.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendMailForgotPassword(data: OtpEmail) {
    await this.mailerService.sendMail({
      to: data.to,
      subject: 'Quên mật khẩu ',
      template: './forgot-password-mail.html',
      context: {
        otp: data.otp,
      },
    });
  }
}
