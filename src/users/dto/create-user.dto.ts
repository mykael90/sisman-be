import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';
import { Role } from 'src/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;

  @ApiProperty({ required: false, type: Date })
  @IsOptional()
  @IsDateString()
  birthAt?: string | Date | null;

  @ApiProperty({ required: false, enum: Role })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
