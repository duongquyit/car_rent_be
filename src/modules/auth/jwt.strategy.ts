import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

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
    const user: User = { ...payload };
    const isLogout = await this.authService.userIsLogout(user);

    if (isLogout) {
      throw new UnauthorizedException('user.CUS-0405');
    }

    return user;
  }
}
