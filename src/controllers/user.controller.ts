import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserService } from 'src/services/user.service';

@ApiTags('/api/v1/user')
@Controller('/api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/user')
  @UseInterceptors(ClassSerializerInterceptor)
  async getUser() {
    return 'Success';
  }
}
