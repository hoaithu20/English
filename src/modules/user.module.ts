import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express/multer';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/controllers/user.controller';
import { UserRepository } from 'src/repositories/user.repository';
import { UserService } from 'src/services/user.service';
import { diskStorage } from 'multer';
import { Helper } from 'src/utils/helper';
import { UserProfileRepository } from 'src/repositories/user-profile.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      UserProfileRepository,
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          filename: Helper.customFileName,
          destination: './upload'
        }),
      }),
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
