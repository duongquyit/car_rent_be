import { ApiProperty } from '@nestjs/swagger';

export class RentalInfoDto {
  @ApiProperty()
  pick_up_city_id: number;

  @ApiProperty()
  pick_up_datetime: string;

  @ApiProperty()
  drop_off_city_id: number;

  @ApiProperty()
  drop_off_datetime: string;
}
