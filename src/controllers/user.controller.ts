import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/security/jwt-auth.guard';
import { UserService } from 'src/services/user.service';

@ApiTags('/api/user')
@Controller('/api/user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser() {
    return 'Success';
  }

  @Get('profile')
  async getProfile() {
    return await this.userService
  }

}
