import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

enum Action {
  pick_up = 'pick_up',
  drop_off = 'drop_off',
}

export class UpdateCarLocationDto {
  @ApiProperty()
  @IsNumber()
  city_id: number;

  @ApiProperty()
  name: Action | string;
}
