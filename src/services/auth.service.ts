import { BadRequestException, Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { UserRepository } from 'src/repositories/user.repository';
import { SignupRequest } from 'src/requests/signup.request';
import { Connection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly connection: Connection,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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
    try {
      await this.connection.transaction(async (manager) => {
        const hash = await bcrypt.hash(
          request.password,
          this.configService.get('authConfig').saltOrRounds,
        );
        const newUser = await this.userRepository.create({
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
    const payload = {id: user.id}
    const token = this.jwtService.sign(payload)
    return { token: token };
  }
}
