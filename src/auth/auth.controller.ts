import {
  Body,
  Controller,
  Post,
  Headers,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { AuthForgetDTO } from './dto/auth-forget.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { User } from 'src/decorators/user-decorator';
import { CreateUserDTO } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: AuthLoginDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDTO) {
    return this.authService.register(body);
  }

  @Post('forget')
  async forget(@Body() body: AuthForgetDTO) {
    return this.authService.forget(body);
  }

  @Post('reset')
  async reset(@Body() body: AuthResetDTO) {
    return this.authService.reset(body);
  }

  @UseGuards(AuthGuard)
  @Post('check-token')
  async checkToken(@User(['id', 'name', 'email']) user: CreateUserDTO) {
    return user;
  }
}
