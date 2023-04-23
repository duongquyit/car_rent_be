import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateCarImageDto {
  @ApiProperty()
  @IsOptional()
  path: string;
}
