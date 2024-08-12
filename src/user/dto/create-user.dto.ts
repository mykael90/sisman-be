import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsDateString,
} from 'class-validator';

export class CreateUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;

  @IsOptional()
  @IsDateString()
  birthAt: string | Date | null;
}

export const blankUser: CreateUserDTO = {
  name: '',
  email: '',
  password: '',
  birthAt: '',
};
