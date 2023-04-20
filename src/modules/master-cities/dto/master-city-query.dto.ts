import { ApiProperty } from '@nestjs/swagger';

export class MasterCityQueryParamsDto {
  @ApiProperty({ required: false })
  car_id: number;

  @ApiProperty({ required: false })
  action_type: string;

  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  offset: number;
}
