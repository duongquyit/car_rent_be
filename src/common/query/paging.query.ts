import { ApiProperty } from '@nestjs/swagger';

import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import {
  APP_DEFAULT_LIMIT,
  APP_DEFAULT_OFFSET,
} from '../constants/app.constant';

export default class PagingQueryDto {
  @ApiProperty({
    name: 'limit',
    type: Number,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  limit = APP_DEFAULT_LIMIT;

  @ApiProperty({
    name: 'offset',
    type: Number,
    required: false,
  })
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  offset = APP_DEFAULT_OFFSET;
}
