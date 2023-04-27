import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { encodePassword } from 'src/common/helpers/bcrypt-hash.helper';
import { UserDto } from './dto/user.dto';
import { instanceToPlain } from 'class-transformer';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [
        { username: createUserDto.username },
        { email: createUserDto.email },
      ],
    });
    if (user) {
      throw new BadRequestException('user.CFO-0017');
    }
    const password = encodePassword(createUserDto.password);
    return await this.userRepository.save({ ...createUserDto, password });
  }

  async findOne(id: number) {
    if (id) {
      return await this.userRepository.findOne({ where: { id } });
    }
  }

  async findAll(options?: UserQueryDto): Promise<any> {
    const { limit: take, offset: skip } = options;
    return await this.userRepository.findAndCount({ skip, take });
  }
}
