import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { decodePassword } from 'src/common/helpers/bcrypt-hash.helper';
import { Repository } from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { signToken } from 'src/common/helpers/token.helper';
import { OauthRefreshToken } from '../oauth_refresh_token/entities/oauth_refresh_token.entity';
import { CreateOauthRefreshTokenDto } from '../oauth_refresh_token/dto/create-oauth_refresh_token.dto';

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
      throw new BadRequestException('user.CFO-0015');
    }

    delete user.password;

    return user;
  }

  async signin(payload: any) {
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

  async logout(payload: any) {
    const { id, refresh_token_id } = payload;

    const refreshToken = await this.oauthRefreshTokenRepository.findOne({
      where: { user_id: id, deleted_at: null, refresh_token: refresh_token_id },
    });

    if (!refreshToken) {
      throw new UnauthorizedException('user.CUS-0405');
    }
    await this.oauthRefreshTokenRepository.softRemove(refreshToken);

    return;
  }

  async getUser(user: any): Promise<User> {
    const userInfor = await this.userRepository.findOne({
      where: { id: user.id },
    });

    return userInfor;
  }

  async userIsLogout(user: any): Promise<boolean> {
    const isExists = await this.oauthRefreshTokenRepository.exist({
      where: {
        user_id: user.id,
        refresh_token: user.refresh_token_id,
      },
    });

    return !isExists;
  }
}
