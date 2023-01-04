import { Module } from '@nestjs/common';
import { OauthRefreshTokenService } from './oauth_refresh_token.service';
import { OauthRefreshTokenController } from './oauth_refresh_token.controller';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OauthRefreshToken } from './entities/oauth_refresh_token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OauthRefreshToken])],
  controllers: [OauthRefreshTokenController],
  providers: [OauthRefreshTokenService, JwtService],
})
export class OauthRefreshTokenModule {}
