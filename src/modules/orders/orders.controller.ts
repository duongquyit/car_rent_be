import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Headers,
  Get,
  Param,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Request } from 'express';
import { I18n, I18nContext } from 'nestjs-i18n';
import { handleResponseOrderDetail } from 'src/helpers/order-detail-response.helper';

@Controller('orders')
@ApiTags('api/v1/orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    return this.ordersService.create(createOrderDto, req.user);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @I18n() i18n: I18nContext) {
    const orderDetails = await this.ordersService.getOrderDetail(id, i18n.lang);
    return handleResponseOrderDetail(orderDetails);
  }
}
