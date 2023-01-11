import { TOKEN_TYPE } from 'src/constants/auth.constant';
import { CreateOauthRefreshTokenDto } from 'src/modules/oauth_refresh_token/dto/create-oauth_refresh_token.dto';
import { create_UUID } from './random-uuid.helper';

export const signToken = async (payload: any, jwtService: any) => {
  const randomUUID = create_UUID();
  const [accessToken, refreshToken] = await Promise.all([
    jwtService.signAsync(payload, {
      secret: process.env.AT_SECRET_KEY,
      expiresIn: process.env.AT_EXPIRES_TIME,
    }),
    jwtService.signAsync(
      { refresh_token_id: randomUUID, user_id: payload.user_id },
      {
        secret: process.env.RT_SECRET_KEY,
        expiresIn: process.env.RT_EXPIRES_TIME,
      },
    ),
  ]);

  const createRTDto: CreateOauthRefreshTokenDto = {
    refresh_token: randomUUID,
    user_id: payload.user_id,
    expired_in: process.env.RT_EXPIRES_TIME,
  };

  const responseToken = {
    access_token: accessToken,
    token_type: TOKEN_TYPE,
    expire_in: process.env.AT_EXPIRES_TIME,
    refresh_token: refreshToken,
  };

  return { createRTDto, responseToken };
};
