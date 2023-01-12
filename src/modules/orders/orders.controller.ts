import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Headers,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Request } from 'express';

@Controller('orders')
@ApiTags('api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiHeader({ name: 'Authorization' })
  create(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: Request,
    @Headers() header: any,
  ) {
    return this.ordersService.create(createOrderDto, req.user);
  }
}
