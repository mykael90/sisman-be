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
import { CreateUserDTO, blankUser } from './dto/create-user.dto';
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
  async create(@Body() data: CreateUserDTO) {
    data.birthAt = data.birthAt ? new Date(data.birthAt) : null;
    return this.userService.create(data);
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id) {
    return this.userService.show(id);
  }

  @Put(':id')
  async updateAll(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdatePutUserDTO,
  ) {
    data.birthAt = data.birthAt ? new Date(data.birthAt) : null;
    const mergedData: UpdatePutUserDTO = { ...blankUser, ...data };
    return this.userService.update(id, mergedData);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id,
    @Body() data: UpdatePatchUserDTO,
  ) {
    data.birthAt = data.birthAt ? new Date(data.birthAt) : undefined;
    return this.userService.updatePartial(id, data);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id) {
    return this.userService.delete(id);
  }
}
