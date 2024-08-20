import { OmitType } from '@nestjs/mapped-types';
import { AuthRegisterDTO } from './auth-register.dto';

export class AuthLoginDTO extends OmitType(AuthRegisterDTO, [
  'name',
] as const) {}
