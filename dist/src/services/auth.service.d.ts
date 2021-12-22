import { UserRepository } from 'src/repositories/user.repository';
import { SignupRequest } from 'src/requests/signup.request';
import { Connection } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailService } from 'src/mail/mail.service';
import { ChangePasswordRequest } from 'src/requests/change-password.requesr';
export declare class AuthService {
    private readonly userRepository;
    private readonly connection;
    private readonly configService;
    private readonly jwtService;
    private mailService;
    constructor(userRepository: UserRepository, connection: Connection, configService: ConfigService, jwtService: JwtService, mailService: MailService);
    validate(username: string, password: string): Promise<void>;
    signup(request: SignupRequest): Promise<{
        token: string;
    }>;
    login(username: string, password: string): Promise<{
        token: string;
    }>;
    forgotPassword(email: string): Promise<void>;
    resetPassword(request: ChangePasswordRequest): Promise<void>;
}
