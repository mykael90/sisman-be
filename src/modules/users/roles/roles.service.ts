import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../../../shared/prisma/prisma.service';
import { CreateUserRoleDto } from '../../../shared/dto/user/role/create-user-role.dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserRoleDto) {
    try {
      return await this.prisma.userRoles.create({ data });
    } catch (error) {
      throw new BadRequestException('Error creating user role');
    }
  }
  //implementar o método list
  async list() {
    try {
      return await this.prisma.userRoles.findMany({
        include: {
          user: false,
          userRoletype: {
            select: {
              role: true,
            },
          },
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Error listing user roles');
    }
  }
}
