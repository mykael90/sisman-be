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
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async list() {
    return this.userService.list();
  }

  @Post()
  async create(@Body() { name, email, password }: CreateUserDTO) {
    return this.userService.create({ name, email, password });
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.userService.show(id);
  }

  @Put(':id')
  async updateAll(
    @Param('id', ParseIntPipe) id,
    @Body() { name, email, password }: UpdatePutUserDTO,
  ) {
    return {
      statusCode: 200,
      method: 'PUT',
      message: 'User updated successfully',
      user: {},
      id,
      name,
      email,
      password,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() { name, email, password }: UpdatePatchUserDTO,
  ) {
    return {
      statusCode: 200,
      method: 'PUT',
      message: 'User updated successfully',
      user: {},
      id,
      name,
      email,
      password,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return {
      statusCode: 200,
      message: 'User deleted successfully',
      user: {},
      id,
    };
  }
}
