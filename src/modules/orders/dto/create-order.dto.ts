import { ApiProperty } from '@nestjs/swagger';
import { BillingInfoDto } from './billing-info.dto';
import { RentalInfoDto } from './rental-info.dto';
import { PaymentMethodDto } from './payment-method-info.dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  ValidateNested,
} from 'class-validator';
import {
  IS_NOT_EMPTY_CODE,
  ONLY_NUMBER_CODE,
} from 'src/common/constants/validation-code.constant';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  car_id: number;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => BillingInfoDto)
  billing_info: BillingInfoDto;

  @ApiProperty()
  @IsNotEmptyObject()
  @Type(() => RentalInfoDto)
  rental_info: RentalInfoDto;

  @ApiProperty()
  @IsNotEmptyObject()
  @Type(() => PaymentMethodDto)
  payment_method: PaymentMethodDto;

  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  @IsNumber({}, { message: ONLY_NUMBER_CODE })
  total: number;

  status: string = 'open';
}
