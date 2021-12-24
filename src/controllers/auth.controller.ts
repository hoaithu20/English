import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { CurrUser } from 'src/decoraters/user.decorator';
import { User } from 'src/repositories/entities/user.entity';
import { ChangePasswordRequest } from 'src/requests/change-password.request';
import { LoginRequest } from 'src/requests/login.request';
import { ResetPasswordRequest } from 'src/requests/reset-password.request';
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

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    return await this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() request: ResetPasswordRequest) {
    return await this.authService.resetPassword(request);
  }

  @Post('change-password')
  async changePassword(@CurrUser() user: User, @Body() request: ChangePasswordRequest) {
    return await this.authService.changePassword(7, request);
  }
}
