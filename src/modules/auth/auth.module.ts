import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { OauthRefreshToken } from '../oauth_refresh_token/entities/oauth_refresh_token.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, OauthRefreshToken])],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    JwtStrategy,
    LocalStrategy,
    JwtAuthGuard,
  ],
})
export class AuthModule {}
