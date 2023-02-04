import { ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNotEmpty, IsNumber, IsNumberString } from 'class-validator';
import {
  IS_NOT_EMPTY_CODE,
  ONLY_ALPHA_CODE,
  ONLY_NUMBER_CODE,
} from 'src/common/constants/validation-code.constant';

export class BillingInfoDto {
  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  @IsAlpha('en-US', { message: ONLY_ALPHA_CODE })
  bill_name: string;

  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  @IsNumberString({}, { message: ONLY_NUMBER_CODE })
  bill_phone_number: string;

  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  bill_address: string;

  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  bill_city: string;
}
