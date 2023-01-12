import { ApiProperty } from '@nestjs/swagger';

export class OauthRequestDto {
  @ApiProperty()
  refresh_token: string;
}
