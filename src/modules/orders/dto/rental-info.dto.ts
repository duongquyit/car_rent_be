import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty } from 'class-validator';
import { IS_DATETIME_CODE } from 'src/common/constants/validation-code.constant';

export class RentalInfoDto {
  @ApiProperty()
  @IsNotEmpty()
  pick_up_city_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString({}, { message: IS_DATETIME_CODE })
  pick_up_datetime: string;

  @ApiProperty()
  @IsNotEmpty()
  drop_off_city_id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString({}, { message: IS_DATETIME_CODE })
  drop_off_datetime: string;
}
