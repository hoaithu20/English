import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { JwtStrategy } from 'src/security/jwt.strategy';
import { LocalStrategy } from 'src/security/local.strategy';
import { AuthService } from 'src/services/auth.service';
import { QuestionsModule } from './questions.module';
import { PackagesModule } from './packages.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'yoona',
      signOptions: {
        expiresIn: '3600s',
      }
    }),
    ConfigModule,
    QuestionsModule,
    PassportModule,
    PackagesModule,
    MailModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
