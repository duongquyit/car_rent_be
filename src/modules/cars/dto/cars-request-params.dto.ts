import { ApiProperty } from '@nestjs/swagger';
import {
  CAR_POPULAR,
  CAR_RECOMENDATION,
} from 'src/common/constants/cars.constant';

export class CarsRequestParamsDto {
  @ApiProperty({ required: false })
  pick_up_city_id: number;

  @ApiProperty({ required: false })
  pick_up_datetime: string;

  @ApiProperty({ required: false })
  drop_off_city_id: number;

  @ApiProperty({ required: false })
  drop_off_datetime: string;

  @ApiProperty({ required: false })
  name: string;

  @ApiProperty({ required: false })
  type_id: number[];

  @ApiProperty({ required: false })
  capacity: number[];

  @ApiProperty({ required: false })
  max_price: number;

  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  offset: number;

  @ApiProperty({ required: false, enum: [CAR_POPULAR, CAR_RECOMENDATION] })
  order_by: string;
}
