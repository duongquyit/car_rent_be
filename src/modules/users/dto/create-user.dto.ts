import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  @IsAlpha()
  @MaxLength(30, {
    message: '',
  })
  first_name: string;

  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  @MaxLength(30, {})
  @IsAlpha()
  last_name: string;

  @IsEmail()
  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  email: string;

  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  username: string;

  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  password: string;

  @IsNotEmpty({
    message: 'system.CFO-0009',
  })
  @IsNumberString({})
  phone_number: string;
}
