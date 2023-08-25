import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
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

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: LoginAuthDto) {
    return this.authService.signin(dto);
  }
  @Post('reset-password')
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto.email, dto.newPassword);
  }

  @Post('update-user')
  updateUser(@Body() dto: UpdateUserDto) {
    return this.authService.updateUser(dto.userId, dto.newEmail, dto.newPassword);
  }
  
}
