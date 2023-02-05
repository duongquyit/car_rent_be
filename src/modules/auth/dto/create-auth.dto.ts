import { PickType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateAuthDto extends PickType(CreateUserDto, [
  'username',
  'password',
]) {
  @ApiProperty()
  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  password: string;
}
