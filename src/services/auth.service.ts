import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { UserRepository } from 'src/repositories/user.repository';
import { SignupRequest } from 'src/requests/signup.request';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { ResetPasswordRequest } from 'src/requests/reset-password.request';
import _ from 'lodash';
import { User } from 'src/repositories/entities/user.entity';
import { ChangePasswordRequest } from 'src/requests/change-password.request';
import { OtpEmail } from 'src/mail/mail-context.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private mailService: MailService,
  ) {}
  async validate(username: string, password: string) {
    throw new Error('Method not implemented.');
  }

  async signup(request: SignupRequest) {
    console.log(request);
    const user = await this.userRepository.find({ email: request.email });
    if (user.length != 0) {
      throw new BadRequestException({
        code: ErrorCode.USER_EXISTED,
      });
    }
    const _user = await this.userRepository.find({
      username: request.username,
    });
    if (_user.length != 0) {
      throw new BadRequestException({
        code: ErrorCode.USERNAME_EXISTED,
      });
    }
    if (request.password !== request.confirmPassword) {
      throw new BadRequestException({
        code: ErrorCode.PASSWORD_NOT_MATCH,
      });
    }
    try {
      await this.connection.transaction(async (manager) => {
        const hash = await bcrypt.hash(
          request.password,
          this.configService.get('authConfig').saltOrRounds,
        );
        const newUser = this.userRepository.create({
          email: request.email,
          username: request.username,
          password: hash,
        });
        await manager.save(newUser);
      });
      return this.login(request.username, request.password);
    } catch (err) {
      console.log(err);
      throw new BadRequestException({
        code: ErrorCode.SIGNUP_FAILED,
      });
    }
  }

  async login(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: [{ email: username }, { username }],
    });
    if (!user) {
      throw new BadRequestException({
        code: ErrorCode.USER_NOT_EXIST,
      });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException({
        code: ErrorCode.INCORRECT_PASSWORD,
      });
    }
    const payload = { id: user.id };
    const token = this.jwtService.sign(payload);
    return { token: token };
  }

  async forgotPassword(email: string) {
    const user = await this.userRepository.findOne({ email });
    if (!user) {
      throw new BadRequestException({
        code: ErrorCode.USER_NOT_EXIST,
      });
    }
    const otp = _.random(100000, 999999);
    const obj: OtpEmail = {
      to: email,
      otp: otp,
    };
    await this.mailService.sendMailForgotPassword(obj);
    return otp;
  }

  async resetPassword(request: ResetPasswordRequest) {
    // if (request.otp != request.newOtp) {
    //   throw new BadRequestException({
    //     code: ErrorCode.INVALID_OTP,
    //   });
    // }
    if (request.newPassword !== request.confirmPassword) {
      throw new BadRequestException({
        code: ErrorCode.PASSWORD_NOT_MATCH,
      });
    }
    const user = await this.userRepository.findOne({
      where: {
        email: request.email,
      },
    });
    if (!user) {
      throw new BadRequestException({
        code: ErrorCode.USER_NOT_EXIST,
      });
    }
    user.password = await bcrypt.hash(
      request.newPassword,
      this.configService.get('authConfig').saltOrRounds,
    );
    await this.connection.manager.save(user);
  }

  async changePassword(userId: number, request: ChangePasswordRequest) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new BadRequestException({
        code: ErrorCode.USER_NOT_EXIST,
      });
    }
    if (!bcrypt.compareSync(request.password, user.password)) {
      throw new BadRequestException({
        code: ErrorCode.INCORRECT_PASSWORD,
      });
    }
    if (request.newPassword !== request.confirmPassword) {
      throw new BadRequestException({
        code: ErrorCode.PASSWORD_NOT_MATCH,
      });
    }
    user.password = await bcrypt.hash(
      request.newPassword,
      this.configService.get('authConfig').saltOrRounds,
    );
    await this.connection.manager.save(user);
  }
}
