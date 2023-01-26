import { Controller, Post, Delete, UseGuards, Req, Get } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { AuthRequire } from 'src/common/decorators/public.decorator';
import { plainToInstance } from 'class-transformer';
import { UserDto } from '../users/dto/user.dto';

@Controller('auth')
@ApiTags('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  @ApiBody({ type: CreateAuthDto })
  async signin(@Req() req: any) {
    return await this.authService.signin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @AuthRequire()
  @ApiBearerAuth()
  @Delete()
  async logout(@Req() req: Request) {
    return await this.authService.logout(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @AuthRequire()
  @ApiBearerAuth()
  @Get()
  async getUser(@Req() req: Request) {
    const user = await this.authService.getUser(req.user);
    return plainToInstance(UserDto, user);
  }
}
