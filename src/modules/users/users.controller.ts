import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UsersService } from './users.service';
import { LogInterceptor } from 'src/common/interceptors/log.interceptor';
import { ParamId } from 'src/common/decorators/param-id-decorator';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/enums/role.enum';
import { RoleGuard } from 'src/core/auth/guards/role.guard';
import { AuthGuard } from 'src/core/auth/guards/auth.guard';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { UsersEntity } from './entities/users.entity';

@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @ApiCreatedResponse({ type: UsersEntity })
  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create(data);
  }

  @UseInterceptors(LogInterceptor)
  @Get()
  @ApiOkResponse({ type: UsersEntity, isArray: true })
  async list() {
    return this.userService.list();
  }

  @Roles(Role.Admin, Role.User)
  @Get(':id')
  @ApiOkResponse({ type: UsersEntity })
  async show(@Param('id', ParseIntPipe) id: number) {
    return this.userService.show(id);
  }

  @Put(':id')
  @ApiOkResponse({ type: UsersEntity })
  async updateAll(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePutUserDTO,
  ) {
    return this.userService.update(id, {
      ...data,
      birthAt: data.birthAt ? new Date(data.birthAt) : null,
    });
  }

  @Patch(':id')
  @ApiOkResponse({ type: UsersEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdatePatchUserDTO,
  ) {
    return this.userService.updatePartial(id, {
      ...data,
      birthAt: data.birthAt ? new Date(data.birthAt) : undefined,
    });
  }

  @Delete(':id')
  @ApiOkResponse({ type: UsersEntity })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
