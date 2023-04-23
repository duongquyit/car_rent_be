import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateCarTypeDto {
  @ApiProperty()
  @IsNotEmpty()
  type_id: number;
}
