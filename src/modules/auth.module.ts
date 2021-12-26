import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from 'src/controllers/auth.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { JwtStrategy } from 'src/security/jwt.strategy';
import { AuthService } from 'src/services/auth.service';
import { QuestionsModule } from './questions.module';
import { PackagesModule } from './packages.module';
import { MailModule } from 'src/mail/mail.module';
import { AdminModule } from './admin.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    JwtModule.register({
      secret: 'vatta',
      signOptions: {
        expiresIn: '7d',
      },
    }),
    ConfigModule,
    QuestionsModule,
    PassportModule,
    PackagesModule,
    MailModule,
    AdminModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
