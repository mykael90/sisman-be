import { PickType } from '@nestjs/mapped-types';
import { AuthRegisterDTO } from './auth-register.dto';

export class AuthForgetDTO extends PickType(AuthRegisterDTO, ['email']) {}
