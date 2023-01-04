import { IsNotEmpty } from 'class-validator';

export class CreateOauthRefreshTokenDto {
  @IsNotEmpty()
  refresh_token: string;

  @IsNotEmpty()
  user_id: number;

  @IsNotEmpty()
  expired_in: string;
}
