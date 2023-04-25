import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from '../cars/entities/car.entity';
import { Order } from './entities/order.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { PaymentMethod } from '../payment-methods/entities/payment-method.entity';
import { MailModule } from '../../shared/mailer/mail.module';
import { MasterCity } from '../master-cities/entities/master_city.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Car,
      Order,
      OrderDetail,
      PaymentMethod,
      MasterCity,
    ]),
    MailModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
