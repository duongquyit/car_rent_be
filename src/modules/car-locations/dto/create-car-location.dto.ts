import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

enum Action {
  pick_up = 'pick_up',
  drop_off = 'drop_off',
}

export class CreateCarLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @ApiProperty()
  @IsNotEmpty()
  name: Action | string;
}
