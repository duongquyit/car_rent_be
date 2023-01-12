import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { OauthRefreshTokenService } from './oauth_refresh_token.service';
import { Response } from 'express';
import { OauthRequestDto } from './dto/oauth-request-params.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('oauth-refresh-token')
@ApiTags('api/v1/oauth-refresh-token')
export class OauthRefreshTokenController {
  constructor(
    private readonly oauthRefreshTokenService: OauthRefreshTokenService,
  ) {}

  @Post()
  async refreshToken(@Body() body: OauthRequestDto, @Res() res: Response) {
    const newToken = await this.oauthRefreshTokenService.refreshToken(
      body.refresh_token,
    );
    return res.status(200).json(newToken);
  }
}
