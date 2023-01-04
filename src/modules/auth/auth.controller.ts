import {
  Controller,
  Post,
  Body,
  Delete,
  Res,
  Headers,
  UseGuards,
} from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { AUTHORIZATION } from 'src/constants/auth.constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async signin(@Body() createAuthDto: CreateAuthDto, @Res() res: Response) {
    const tokens = await this.authService.signin(createAuthDto);
    return res.status(200).json(tokens);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async logout(
    @Headers(AUTHORIZATION) authorization: string,
    @Res() res: Response,
  ) {
    await this.authService.logout(authorization);
    res.status(200).json({});
  }
}
