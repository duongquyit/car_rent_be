import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class OauthRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  refresh_token: string;
}
