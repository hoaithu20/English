import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { UserService } from 'src/services/user.service';
import { CurrUser } from 'src/decoraters/user.decorator';
import { User } from 'src/repositories/entities/user.entity';
import { UserProfileRepository } from 'src/repositories/user-profile.repository';
import { ErrorCode } from 'src/constants/errorcode.constant';
import { UpdateProfileRequest } from 'src/requests/update-profile.request';

@ApiTags('/api/user')
@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly profileRepository: UserProfileRepository,
  ) { }

  @Get('/user')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser() {
    return 'Success';
  }

  @Post('profile')
  async getProfile(@Body() request: { userId: number }) {
    return await this.userService.getProfile(request.userId);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post('update-profile')
  @UseInterceptors(FileInterceptor('avatar'))
  async uploadFile(
    @CurrUser() user: User,
    @UploadedFile() file: Express.Multer.File,
    @Body() request: UpdateProfileRequest,
  ) {
    try {
      const profile = await this.profileRepository
        .createQueryBuilder()
        .where('user_id = :userId', { userId: user.id })
        .getOne();
      if (profile) {
        (profile.dateOfBirth = request.date),
          profile.sex = request.sex,
          profile.avatar = file?.filename,
          profile.save();
      } else {
        const newProfile = this.profileRepository.create({
          user: user.id as any,
          dateOfBirth: request.date,
          sex: request.sex,
          avatar: file?.filename,
        });
        newProfile.save();
      }
      return profile;
    } catch (err) {
      throw new BadRequestException({
        code: ErrorCode.UNSUCCESS,
      });
    }
  }

  @Get('avatar/:img?')
  async getAvatar(@Query('img') img: string, @Res() res) {
    console.log(img)
    return res.sendFile(img, {
      root: 'upload',
    });
  }
}
