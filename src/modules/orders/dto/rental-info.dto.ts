import { ApiProperty } from '@nestjs/swagger';
import { IsDateString } from 'class-validator';
import { IS_DATETIME_CODE } from 'src/constants/validation-code.constant';

export class RentalInfoDto {
  @ApiProperty()
  pick_up_city_id: number;

  @ApiProperty()
  @IsDateString({}, { message: IS_DATETIME_CODE })
  pick_up_datetime: string;

  @ApiProperty()
  drop_off_city_id: number;

  @ApiProperty()
  @IsDateString({}, { message: IS_DATETIME_CODE })
  drop_off_datetime: string;
}
