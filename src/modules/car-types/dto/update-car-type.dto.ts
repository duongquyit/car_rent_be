import { ApiProperty } from '@nestjs/swagger';

export class UpdateCarTypeDto {
  @ApiProperty()
  type_id: number;
}
