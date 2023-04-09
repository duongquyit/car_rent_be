import { ApiProperty } from '@nestjs/swagger';

export class PaginateDTO {
  @ApiProperty({ required: false })
  limit: number;

  @ApiProperty({ required: false })
  offset: string;
}
