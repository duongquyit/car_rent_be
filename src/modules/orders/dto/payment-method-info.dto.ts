import { ApiProperty } from '@nestjs/swagger';

export class PaymentMethodDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
