import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  Query,
  Header,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from './dto/user.dto';
import { plainToClass } from 'class-transformer';
import { UsersDto } from './dto/users.dto';
import { UserQueryDto } from './dto/user-query.dto';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    await this.usersService.create(createUserDto);
    return res.status(201).json({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get()
  @Header('Access-Control-Expose-Headers', 'Content-Range')
  async findAll(@Query() query: UserQueryDto): Promise<any> {
    const { limit, offset } = query;
    const [users, length] = await this.usersService.findAll(query);

    return plainToClass(UsersDto, {
      items: users,
      pagination: { limit, offset, total: length },
    });
  }
}
