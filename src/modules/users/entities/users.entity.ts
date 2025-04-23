import { User } from 'prisma/generated/client';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/common/enums/role.enum';

export class UsersEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: 'Jonh Smith' })
  name: string;

  @ApiProperty({ example: 'example@mailserver.com' })
  email: string;

  @ApiProperty({ example: '123456' })
  password: string;

  @ApiProperty({ required: false, nullable: true })
  birthAt: Date;

  @ApiProperty({ required: false, nullable: false, default: 1, enum: Role })
  role: number;

  @ApiProperty({ required: false, nullable: true })
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
