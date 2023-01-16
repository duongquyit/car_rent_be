import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { IS_AUTH_REQUIRE } from '../decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
    status?: any,
  ): TUser {
    if (err) {
      throw err;
    }

    const isAuthRequire = this.reflector.getAllAndOverride<boolean>(
      IS_AUTH_REQUIRE,
      [context.getHandler(), context.getClass()],
    );

    if (isAuthRequire && !user) {
      throw err || new UnauthorizedException('user.CUS-0405');
    }
    return user;
  }
}
