import { Body, Controller, Get, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateUserRoletypeDto } from '../../../shared/dto/user/role/create-user-roletype.dto';
import { CreateUserRoleDto } from '../../../shared/dto/user/role/create-user-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() data: CreateUserRoleDto) {
    return this.rolesService.create(data);
  }

  @Get()
  async list() {
    return this.rolesService.list();
  }
}
