import { Controller, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { CarsRequestParamsDto } from '../cars/dto/cars-request-params.dto';

@Controller('auth')
@ApiTags('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async signin(@Req() req: any) {
    return await this.authService.signin(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async logout(@Req() req: Request) {
    return await this.authService.logout(req.user);
  }
}
