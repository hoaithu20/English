import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginRequest } from 'src/requests/login.request';
import { SignupRequest } from 'src/requests/signup.request';
import { AuthService } from 'src/services/auth.service';

@ApiTags('/api/auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    type: SignupRequest,
  })
  @Post('signup')
  async signup(@Body() request: SignupRequest) {
    return await this.authService.signup(request);
  }

  @ApiBody({
    type: LoginRequest,
  })
  @Post('login')
  async login(@Body() request: LoginRequest) {
    return await this.authService.login(request.username, request.password);
  }

  // @Post('forgot-password')
  // async forgotPassword() {
  //   return await this.authService.forgotPassword(1);
  // }
}
