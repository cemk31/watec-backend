import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { LoginAuthDto } from './dto/loginAuth.dto';
import { ResetPasswordDto } from './dto/resetPasswort.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @Get('verify-email/:confirmationToken')
  async verifyEmail(
    @Param('confirmationToken') confirmationToken: string,
  ): Promise<void> {
    return this.authService.verifyEmail(confirmationToken);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: LoginAuthDto) {
    return this.authService.signin(dto);
  }
  @Post('update-user')
  updateUser(@Body() dto: UpdateUserDto) {
    return this.authService.updateUser(
      dto.userId,
      dto.newEmail,
      dto.newPassword,
    );
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  forgotPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    console.log("dto", dto);
    return this.authService.resetPassword(dto.email, dto.newPassword);
  }
}
