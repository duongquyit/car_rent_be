import { ApiProperty } from '@nestjs/swagger';

export class BillingInfoDto {
  @ApiProperty()
  bill_name: string;

  @ApiProperty()
  bill_phone_number: string;

  @ApiProperty()
  bill_address: string;

  @ApiProperty()
  bill_city: string;
}
