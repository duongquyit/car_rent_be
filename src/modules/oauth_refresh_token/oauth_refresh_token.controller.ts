import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { OauthRefreshTokenService } from './oauth_refresh_token.service';
import { OauthRequestDto } from './dto/oauth-request-params.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('oauth-refresh-token')
@ApiTags('Oauth Refresh Token')
export class OauthRefreshTokenController {
  constructor(
    private readonly oauthRefreshTokenService: OauthRefreshTokenService,
  ) {}

  @Post()
  async refreshToken(@Body() body: OauthRequestDto) {
    return await this.oauthRefreshTokenService.refreshToken(body.refresh_token);
  }
}
