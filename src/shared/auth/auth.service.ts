import {
  BadRequestException,
  ConsoleLogger,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { User, UserRole } from 'prisma/generated/client';
import { AuthRegisterDTO } from './dto/auth-register.dto';
import { UsersService } from 'src/modules/users/users.service';
import * as bcrypt from 'bcrypt';
import { MailerService } from '@nestjs-modules/mailer';
import { AuthRegisterAuthorizationTokenDTO } from './dto/auth-register-authorization-token.dto';
import { AuthLoginAuthorizationTokenDTO } from './dto/auth-login-authorization-token.dto';

@Injectable()
export class AuthService {
  private readonly issuer = 'login';
  private readonly audience = 'users';
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userService: UsersService,
    private readonly mailer: MailerService,
  ) {}

  createToken(user: User, roles: UserRole[] = []) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          roles: roles.map((role) => role.userRoletypeId),
        },
        {
          expiresIn: '7 days',
          subject: String(user.id),
          issuer: this.issuer,
          audience: this.audience,
        },
      ),
      roles: roles.map((role) => role.userRoletypeId),
    };
  }

  createTokenForgetPassword(user: User) {
    return {
      accessToken: this.jwtService.sign(
        {
          id: user.id,
        },
        {
          expiresIn: '30 minutes',
          subject: String(user.id),
          issuer: 'forget',
          audience: this.audience,
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: this.issuer,
      });
      return data;
    } catch (e) {
      throw new UnauthorizedException(`Token inválido!`);
    }
  }
  checkTokenForgetPassword(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        audience: this.audience,
        issuer: 'forget',
      });
      return data;
    } catch (e) {
      throw new UnauthorizedException(`Token inválido!`);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (e) {
      return false;
    }
  }

  async loginAuthorizationToken(data: AuthLoginAuthorizationTokenDTO) {
    const token = this.jwtService.verify(data.token, {
      secret: process.env.AUTHORIZATION_JWT_SECRET,
    });

    if (!token) {
      throw new UnauthorizedException(`Token inválido!`);
    }

    if (!token.email) {
      throw new UnauthorizedException(`Token inválido!`);
    }

    const user: User = await this.prisma.user.findFirst({
      where: { email: token.email },
    });

    if (!user) {
      return this.register({
        name: token.name,
        email: token.email,
        login: token.login,
      });
    }

    const roles = await this.prisma.userRole.findMany({
      where: { userId: user.id },
    });

    console.log(roles);

    return this.createToken(user, roles);
  }

  async register(data: AuthRegisterDTO) {
    if (await this.existsEmail(data.email)) {
      throw new BadRequestException(`E-mail already in use!`);
    }

    const user = await this.userService.create(data);
    return this.createToken(user);
  }

  async registerAuthorizationToken(data: AuthRegisterAuthorizationTokenDTO) {
    const token = this.jwtService.verify(data.token, {
      secret: process.env.AUTHORIZATION_JWT_SECRET,
    });

    if (!token) {
      throw new UnauthorizedException(`Token inválido!`);
    }

    if (!token.email) {
      throw new UnauthorizedException(`Token inválido!`);
    }

    if (await this.existsEmail(token.email)) {
      throw new BadRequestException(`E-mail already in use!`);
    }

    return this.register({
      name: token.name,
      email: token.email,
      login: token.login,
    });
  }

  async existsEmail(email: string) {
    const user = await this.prisma.user.findFirst({ where: { email } });
    return !!user;
  }
}
