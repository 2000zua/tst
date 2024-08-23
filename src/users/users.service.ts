import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService
  ){}

  async create(data: CreateUserDto) {
    try {
      return this.prisma.users.create({data: {
        frst_name: data.frst_name, last_name: data.last_name, email: data.email, username: data.username, birthday: data.birthday
      }});
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findAll() {
    try {
     
      return this.prisma.users.findMany();
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async findOne(id: string) {
    try {
      return this.prisma.users.findUnique({where:{id}});
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async update(data: UpdateUserDto) {
    try {
      return this.prisma.users.update({where:{id: data.id}, data: {
        frst_name: (data.frst_name != undefined)? data.frst_name : undefined,
        last_name: (data.last_name != undefined)? data.last_name : undefined,
        email: (data.email != undefined)? data.email : undefined,
        birthday: (data.birthday != undefined)? data.birthday : undefined,
        username: (data.username != undefined)? data.username : undefined,
      }});
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.users.delete({where:{id}})
      return this.findAll();
    } catch (error) {
      throw new HttpException(error, HttpStatus.FORBIDDEN);
    }
  }
}
