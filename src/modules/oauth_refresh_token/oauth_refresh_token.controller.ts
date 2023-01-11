import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';
import { OauthRefreshTokenService } from './oauth_refresh_token.service';
import { Request, Response } from 'express';
import { REFRESH_TOKEN } from 'src/constants/auth.constant';

@Controller('oauth-refresh-token')
export class OauthRefreshTokenController {
  constructor(
    private readonly oauthRefreshTokenService: OauthRefreshTokenService,
  ) {}

  @Post()
  async refreshToken(@Body(REFRESH_TOKEN) body: Request, @Res() res: Response) {
    const newToken = await this.oauthRefreshTokenService.refreshToken(body);
    return res.status(200).json(newToken);
  }
}
