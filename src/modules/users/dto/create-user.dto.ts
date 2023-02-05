import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  MaxLength,
} from 'class-validator';
import {
  IS_EMAIL_CODE,
  IS_NOT_EMPTY_CODE,
  MAX_LENGTH_CODE,
  ONLY_NUMBER_CODE,
} from 'src/common/constants/validation-code.constant';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  @MaxLength(30, {
    message: MAX_LENGTH_CODE,
  })
  @ApiProperty()
  first_name: string;

  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  @MaxLength(30, {
    message: MAX_LENGTH_CODE,
  })
  @ApiProperty()
  last_name: string;

  @IsEmail(
    {},
    {
      message: IS_EMAIL_CODE,
    },
  )
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  email: string;

  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  username: string;

  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  password: string;

  @ApiProperty({ description: 'Only number' })
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  @IsNumberString(
    {},
    {
      message: ONLY_NUMBER_CODE,
    },
  )
  phone_number: string;
}
