import { SetMetadata } from '@nestjs/common';

export const IS_AUTH_REQUIRE: string = 'isAuthRequire';
export const AuthRequire = () => SetMetadata(IS_AUTH_REQUIRE, true);
