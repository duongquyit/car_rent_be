import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class ReviewRequestParamsDto {
  @ApiProperty()
  @IsNotEmpty()
  car_id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  limit: number;

  @ApiProperty({ required: false })
  @IsOptional()
  offset: number;
}
