import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { decodePassword } from 'src/helpers/bcrypt-hash.helper';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { OauthRefreshToken } from 'src/modules/oauth_refresh_token/entities/oauth_refresh_token.entity';
import { CreateOauthRefreshTokenDto } from '../oauth_refresh_token/dto/create-oauth_refresh_token.dto';
import { signToken } from 'src/helpers/token.helper';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(OauthRefreshToken)
    private oauthRefreshTokenRepository: Repository<OauthRefreshToken>,
    private jwtService: JwtService,
  ) {}

  async validateUser(createAuthDto: CreateAuthDto) {
    const user = await this.userRepository.findOne({
      where: [
        {
          username: createAuthDto.username,
        },
        {
          email: createAuthDto.username,
        },
        {
          phone_number: createAuthDto.username,
        },
      ],
    });
    if (!user) {
      throw new BadRequestException('user.CFO-0015');
    }
    const isMatch = decodePassword(createAuthDto.password, user.password);
    if (!isMatch) {
      throw new BadRequestException('user.CFO-0016');
    }

    return { user_id: user.id };
  }

  async signin(createAuthDto: CreateAuthDto) {
    const payload = await this.validateUser(createAuthDto);
    const { createRTDto, responseToken } = await signToken(
      payload,
      this.jwtService,
    );
    await this.newRefreshToken(createRTDto);

    return responseToken;
  }

  async newRefreshToken(createRTDto: CreateOauthRefreshTokenDto) {
    return await this.oauthRefreshTokenRepository.save(createRTDto);
  }

  async logout(authorization: string) {
    const token = authorization.split(' ')[1];
    const { user_id } = await this.jwtService.verifyAsync(token, {
      secret: process.env.AT_SECRET_KEY,
    });
    const refreshToken = await this.oauthRefreshTokenRepository.findOne({
      where: { user_id, deleted_at: null },
    });

    await this.oauthRefreshTokenRepository.softRemove(refreshToken);
    return;
  }
}
