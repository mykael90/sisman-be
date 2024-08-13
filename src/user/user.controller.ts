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
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UserService } from './user.service';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id-decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor)
  @Get()
  async list() {
    return this.userService.list();
  }

  @Post()
  async create(@Body() data: CreateUserDTO) {
    return this.userService.create({
      ...data,
      birthAt: data.birthAt ? new Date(data.birthAt) : null,
    });
  }

  @Get(':id')
  async show(@ParamId() id: number) {
    return this.userService.show(id);
  }

  @Put(':id')
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
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.userService.delete(id);
  }
}
