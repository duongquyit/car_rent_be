import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Car } from '../cars/entities/car.entity';
import { Order } from './entities/order.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { PaymentMethodDto } from './dto/payment-method-info.dto';
import { PaymentMethod } from '../payment-methods/entities/payment-method.entity';
import {
  DEFAULT_QUANTITY,
  FAILED_STATUS,
  A_DAY_IN_MILLISECONDS,
  OPEN_STATUS,
  SUCCESS_STATUS,
} from 'src/constants/order.constant';
import PayoutFactory from '../payment-methods/payment-method-factory/payout-factory';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: any) {
    const { billing_info, payment_method, rental_info, car_id } =
      createOrderDto;

    const { user_id } = user;

    const car = await this.validateCarExists(+car_id);

    await this.checkCarAvaiable(+car_id, rental_info);

    const subTotal = this.getSubtotal(
      rental_info.pick_up_datetime,
      rental_info.drop_off_datetime,
      DEFAULT_QUANTITY,
      car.price,
    );

    const newOrder = await this.orderRepository.save({
      user_id,
      payment_method_id: payment_method.id,
      ...billing_info,
      status: OPEN_STATUS,
    });

    await this.orderDetailRepository.save({
      ...rental_info,
      car_id: car.id,
      sub_total: subTotal,
      order_id: newOrder.id,
    });

    const payOut = await this.genetatePayout(payment_method);
    payOut.setAmount(subTotal);
    let payoutStatus = payOut.pay() ? SUCCESS_STATUS : FAILED_STATUS;

    const orderResult = await this.orderRepository.save({
      ...newOrder,
      status: payoutStatus,
      total: subTotal,
    });

    if (payOut.pay()) {
      // create new transation.
    }

    return orderResult;
  }

  async validateCarExists(carId: number): Promise<Car> {
    const car = await this.carRepository.findOne({ where: { id: +carId } });
    if (!car) {
      throw new BadRequestException('message');
    }

    return car;
  }

  async checkCarAvaiable(carId: number, rentalInfor: any): Promise<Boolean> {
    const { pick_up_datetime, drop_off_datetime } = rentalInfor;
    this.checkDateTimeValid(pick_up_datetime, drop_off_datetime);

    const queryBuilder = this.orderDetailRepository
      .createQueryBuilder('order_details')
      .where('order_details.car_id = :car_id', { car_id: carId })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'order_details.drop_off_datetime between :pick_up_datetime and :drop_off_datetime',
            {
              pick_up_datetime,
              drop_off_datetime,
            },
          );
        }),
      );
    const carsAmount = await queryBuilder.getCount();
    if (carsAmount) {
      throw new BadRequestException('Car is not available');
    }

    return true;
  }

  checkDateTimeValid(pick_up_datetime: string, drop_off_datetime: string) {
    const start = new Date(pick_up_datetime);
    const end = new Date(drop_off_datetime);

    if (start < new Date() || end < new Date()) {
      console.log('Start or End day can not less now');
      throw new BadRequestException('Car is not available');
    }
    if (start > end) {
      console.log('Start day can not be less than end day');
      throw new BadRequestException('Start day can not be less than end day');
    }
  }

  async genetatePayout(paymentMethodDto: PaymentMethodDto) {
    const method = await this.paymentMethodRepository.findOne({
      where: { id: paymentMethodDto.id },
    });

    if (!method) {
      throw new Error('message');
    }
    const payOut = PayoutFactory.generatePayout(method.name);

    return payOut;
  }

  getSubtotal(
    pick_up_datetime: string,
    drop_off_datetime: string,
    quantity: number,
    price: number,
  ) {
    const start: any = new Date(pick_up_datetime);
    const end: any = new Date(drop_off_datetime);
    const days = Math.ceil((end - start) / A_DAY_IN_MILLISECONDS);

    return days * price * quantity;
  }
}
