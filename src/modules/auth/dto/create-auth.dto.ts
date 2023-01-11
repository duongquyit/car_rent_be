import { PickType } from '@nestjs/mapped-types';
import { IsAlpha, IsNotEmpty } from 'class-validator';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

export class CreateAuthDto extends PickType(CreateUserDto, [
  'username',
  'password',
]) {
  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  username: string;

  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  password: string;
}
