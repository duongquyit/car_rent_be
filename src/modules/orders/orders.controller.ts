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
import { handleResponseOrderDetail } from 'src/common/helpers/order-detail-response.helper';
import { MailService } from '../../shared/mailer/mail.service';
import { AuthRequire } from 'src/common/decorators/public.decorator';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Controller('orders')
@ApiTags('Orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @AuthRequire()
  @ApiBearerAuth()
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const order = await this.ordersService.create(createOrderDto, req.user);
    const user: User = await this.usersService.findOne(order.user_id);
    await this.mailService.requestSendMailAfterOrderSuccess(user.email, order);
    return order;
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @I18n() i18n: I18nContext) {
    const orderDetails = await this.ordersService.getOrderDetail(id, i18n.lang);
    return handleResponseOrderDetail(orderDetails);
  }
}
