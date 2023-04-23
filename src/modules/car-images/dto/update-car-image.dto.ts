import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateCarImageDto {
  @ApiProperty()
  @IsOptional()
  path: string;
}
