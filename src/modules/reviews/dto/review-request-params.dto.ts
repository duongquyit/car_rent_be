import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ReviewRequestParamsDto {
  @ApiProperty()
  @IsNotEmpty()
  car_id: number;

  @ApiProperty({
    required: false,
  })
  limit: number;

  @ApiProperty({ required: false })
  offset: number;
}
