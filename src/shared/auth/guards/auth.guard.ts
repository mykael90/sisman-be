import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from 'src/shared/auth/auth.service';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;

    // console.log(request, authorization);

    try {
      const token = authorization?.split(' ')[1];

      const data = this.authService.checkToken(token);

      request.tokenPayload = data;

      request.user = await this.userService.show(data.id);

      return true;
    } catch (e) {
      return false;
    }
  }
}
