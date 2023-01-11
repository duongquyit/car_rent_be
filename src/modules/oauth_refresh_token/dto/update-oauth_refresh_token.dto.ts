import { PartialType } from '@nestjs/mapped-types';
import { CreateOauthRefreshTokenDto } from './create-oauth_refresh_token.dto';

export class UpdateOauthRefreshTokenDto extends PartialType(CreateOauthRefreshTokenDto) {}
