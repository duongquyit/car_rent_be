import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Headers,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiBearerAuth, ApiHeader, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { Request, query } from 'express';
import { I18nService } from 'nestjs-i18n';
import {
  formatOrderResponse,
  handleResponseOrders,
} from 'src/common/helpers/order-detail-response.helper';
import { MailService } from '../../shared/mailer/mail.service';
import { AuthRequire } from 'src/common/decorators/public.decorator';
import { EN } from 'src/common/constants/language.constant';
import { SUCCESS_STATUS } from 'src/common/constants/order.constant';
import { User } from '@sentry/node';

@Controller('orders')
@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@AuthRequire()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly mailService: MailService,
    private readonly i18nService: I18nService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Req() req: Request) {
    const order = await this.ordersService.create(createOrderDto, req.user);
    const user = req.user as User;

    if (order.status === SUCCESS_STATUS) {
      await this.mailService.addSendMailJobToQueue(user.email, order);
    }

    return { id: order.id };
  }

  @Get('revenue')
  async getRevenue(@Query() query: any) {
    console.log({ query });
    const revenue = await this.ordersService.getRevenue(
      query.fromDate,
      query.toDate,
    );

    const groupedData = revenue.reduce((acc, curr) => {
      const key = `${curr.year}-${curr.month}`;
      acc[key] = acc[key] || { year: curr.year, month: curr.month, revenue: 0 };
      acc[key].revenue += parseFloat(curr.revenue);
      return acc;
    }, {});

    return Object.values(groupedData);
  }

  @Get('compare-revenue')
  async getCompareRevenue(@Query() query: any) {
    console.log({ query });
    const revenue =
      await this.ordersService.getCurrentAndPreviousMonthRevenue();

    return revenue;
  }

  @Get(':id')
  @ApiHeader({
    name: 'accept-language',
    required: false,
  })
  async findOne(
    @Param('id') id: number,
    @Headers('accept-language') lang: string,
  ) {
    const orderDetails = await this.ordersService.getOrderDetail(
      id,
      this.i18nService.resolveLanguage(lang || EN),
    );

    return handleResponseOrders(orderDetails);
  }

  @Get()
  @ApiHeader({
    name: 'accept-language',
    required: false,
  })
  async getOrders(
    @Req() req: Request,
    @Headers('accept-language') lang: string,
  ) {
    const orders = await this.ordersService.getOrdersDetail(
      req.user,
      this.i18nService.resolveLanguage(lang || EN),
    );

    return formatOrderResponse(orders);
  }
}
