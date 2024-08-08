import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  async list() {
    return {
      statusCode: 200,
      message: 'User read successfully',
      users: [],
    };
  }

  @Post()
  async create(@Body() body) {
    return {
      statusCode: 201,
      message: 'User created successfully',
      body,
    };
  }

  @Get(':id')
  async show(@Param('id') params) {
    return {
      statusCode: 200,
      message: 'User read successfully',
      user: {},
      params,
    };
  }

  @Put(':id')
  async updateAll(@Param('id') params, @Body() body) {
    return {
      statusCode: 200,
      method: 'PUT',
      message: 'User updated successfully',
      user: {},
      params,
      body,
    };
  }

  @Patch(':id')
  async update(@Param('id') params, @Body() body) {
    return {
      statusCode: 200,
      method: 'PUT',
      message: 'User updated successfully',
      user: {},
      params,
      body,
    };
  }

  @Delete(':id')
  async delete(@Param('id') params) {
    return {
      statusCode: 200,
      message: 'User deleted successfully',
      user: {},
      params,
    };
  }
}
