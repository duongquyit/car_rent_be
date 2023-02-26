import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IS_NOT_EMPTY_CODE } from 'src/common/constants/validation-code.constant';

export class CreateReviewDTO {
  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  order_detail_id: number;

  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  content: string;

  @ApiProperty()
  @IsNotEmpty({
    message: IS_NOT_EMPTY_CODE,
  })
  stars: number;
}
