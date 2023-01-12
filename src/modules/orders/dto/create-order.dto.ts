import { ApiProperty } from '@nestjs/swagger';
import { BillingInfoDto } from './billing-info.dto';
import { RentalInfoDto } from './rental-info.dto';
import { PaymentMethodDto } from './payment-method-info.dto';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNotEmptyObject } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  car_id: number;

  @ApiProperty()
  @IsNotEmptyObject()
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
  @IsNotEmpty()
  total: number;

  status: string = 'open';
}
