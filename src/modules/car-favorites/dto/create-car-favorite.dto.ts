import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCarFavoriteDto {
  @ApiProperty()
  @IsNotEmpty()
  car_id: number;
}
