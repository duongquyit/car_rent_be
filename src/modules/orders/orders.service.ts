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
  ORDER_DETAIL_SELECT_COLS,
} from 'src/constants/order.constant';
import PayoutFactory from '../payment-methods/payment-method-factory/payout-factory';
import IPayOut from '../payment-methods/payment-method-factory/interfaces/payout.interface';

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

  async create(createOrderDto: CreateOrderDto, user: any): Promise<Order> {
    const { billing_info, payment_method, rental_info, car_id } =
      createOrderDto;

    const user_id: number = user.user_id;

    const car: Car = await this.validateCarExists(+car_id);

    await this.checkCarAvaiable(+car_id, rental_info);

    const subTotal: number = this.getSubtotal(
      rental_info.pick_up_datetime,
      rental_info.drop_off_datetime,
      DEFAULT_QUANTITY,
      car.price,
    );

    const newOrder: Order = await this.orderRepository.save({
      user_id,
      payment_method_id: payment_method.id,
      ...billing_info,
      status: OPEN_STATUS,
    });

    const orderDetails = await this.orderDetailRepository.save({
      ...rental_info,
      car_id: car.id,
      sub_totals: subTotal,
      order_id: newOrder.id,
    });

    const payOut: IPayOut = await this.genetatePayout(payment_method);
    payOut.setAmount(subTotal);
    const payoutStatus: string = payOut.pay() ? SUCCESS_STATUS : FAILED_STATUS;

    const orderResult: Order = await this.orderRepository.save({
      ...newOrder,
      status: payoutStatus,
      total: subTotal,
    });

    if (payOut.pay()) {
      // create new transation.
    }

    return { ...orderResult, ...orderDetails, id: newOrder.id };
  }

  async validateCarExists(carId: number): Promise<Car> {
    const car: Car = await this.carRepository.findOne({
      where: { id: +carId },
    });
    if (!car) {
      throw new BadRequestException('app.FEC-0045');
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
          ).orWhere(
            'order_details.pick_up_datetime between :pick_up_datetime and :drop_off_datetime',
            {
              pick_up_datetime,
              drop_off_datetime,
            },
          );
        }),
      );
    const carsAmount: number = await queryBuilder.getCount();

    if (carsAmount) {
      throw new BadRequestException('app.FEC-0044');
    }

    return true;
  }

  checkDateTimeValid(
    pick_up_datetime: string,
    drop_off_datetime: string,
  ): void {
    const start = new Date(pick_up_datetime);
    const end = new Date(drop_off_datetime);

    if (start < new Date() || end < new Date()) {
      throw new BadRequestException('app.FEC-0042');
    }
    if (start > end) {
      throw new BadRequestException('app.FEC-0043');
    }
  }

  async genetatePayout(paymentMethodDto: PaymentMethodDto): Promise<IPayOut> {
    const method: PaymentMethod = await this.paymentMethodRepository.findOne({
      where: { id: paymentMethodDto.id },
    });

    if (!method) {
      throw new BadRequestException('order.FEC-0041');
    }
    const payOut: IPayOut = PayoutFactory.generatePayout(method.name);

    return payOut;
  }

  getSubtotal(
    pick_up_datetime: string,
    drop_off_datetime: string,
    quantity: number,
    price: number,
  ): number {
    const start: number = new Date(pick_up_datetime).getMilliseconds();
    const end: number = new Date(drop_off_datetime).getMilliseconds();
    const days: number = Math.ceil((end - start) / A_DAY_IN_MILLISECONDS);

    return days * price * quantity;
  }

  async getOrderDetail(id: number, lang: string): Promise<OrderDetail[]> {
    const queryBuilder = this.orderDetailRepository
      .createQueryBuilder('order_details')
      .innerJoin('order_details.car', 'car')
      .innerJoin(
        'car.car_translation',
        'car_translation',
        'car_translation.code = :lang',
        { lang },
      )
      .innerJoin('order_details.pick_up_city', 'pick_up_city')
      .innerJoin('order_details.drop_off_city', 'drop_off_city')
      .innerJoin('car.car_types', 'car_types')
      .innerJoin('car_types.master_type', 'master_type')
      .innerJoin(
        'master_type.master_type_translation',
        'master_type_translation',
      )
      .where('order_details.order_id = :order_id', { order_id: id })
      .select(ORDER_DETAIL_SELECT_COLS);

    return await queryBuilder.getMany();
  }
}
