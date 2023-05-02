import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { OauthRefreshToken } from './entities/oauth_refresh_token.entity';
import { Repository } from 'typeorm';
import { signToken } from '../../common/helpers/token.helper';

@Injectable()
export class OauthRefreshTokenService {
  constructor(
    @InjectRepository(OauthRefreshToken)
    private oauthRefreshTokenRepository: Repository<OauthRefreshToken>,
    private jwtService: JwtService,
  ) {}

  async refreshToken(refreshToken: any) {
    const { refresh_token_id, id } = await this.jwtService.verifyAsync(
      refreshToken,
      {
        secret: process.env.RT_SECRET_KEY,
      },
    );

    const oauthRefreshToken = await this.oauthRefreshTokenRepository.findOne({
      where: {
        refresh_token: refresh_token_id,
        user_id: id,
        created_at: null,
      },
    });

    if (!oauthRefreshToken) {
      throw new UnauthorizedException('user.CUS-0403');
    }
    const { createRTDto, responseToken } = await signToken(
      { user_id: id },
      this.jwtService,
    );
    await this.oauthRefreshTokenRepository.save(createRTDto);
    await this.oauthRefreshTokenRepository.softRemove(oauthRefreshToken);

    return responseToken;
  }
}
