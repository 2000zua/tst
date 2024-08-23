import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users/')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('criar')
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('all')
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('one/:id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('updated')
  async update(@Body() data: UpdateUserDto) {
    return this.usersService.update(data);
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
