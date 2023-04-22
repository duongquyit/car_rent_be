import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.AT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    const user = {
      user_id: payload.user_id,
      refresh_token_id: payload.refresh_token_id,
      role: payload.role,
    };
    const isLogout = await this.authService.userIsLogout(user);
    if (isLogout) {
      throw new UnauthorizedException('user.CUS-0405');
    }

    return user;
  }
}
