import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  @IsAlpha()
  @MaxLength(30, {
    message: '',
  })
  @ApiProperty()
  first_name: string;

  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  @MaxLength(30, {})
  @IsAlpha()
  @ApiProperty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  email: string;

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

  @ApiProperty({ description: 'Only number' })
  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  @IsNumberString({})
  phone_number: string;
}
