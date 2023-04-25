import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Car } from '../cars/entities/car.entity';
import { ORDER_DETAIL_SELECT_COLS, Order } from './entities/order.entity';
import { OrderDetail } from '../order-details/entities/order-detail.entity';
import { PaymentMethodDto } from './dto/payment-method-info.dto';
import { PaymentMethod } from '../payment-methods/entities/payment-method.entity';
import {
  DEFAULT_QUANTITY,
  A_DAY_IN_MILLISECONDS,
  OPEN_STATUS,
  SUCCESS_STATUS,
  INPROGRESS_STATUS,
} from 'src/common/constants/order.constant';
import PayoutFactory from '../payment-methods/payment-method-factory/payout-factory';
import IPayOut from '../payment-methods/payment-method-factory/interfaces/payout.interface';
import { MasterCity } from '../master-cities/entities/master_city.entity';
import { DROP_OFF, PICK_UP } from 'src/common/constants/car-locations';
import { BadRequestError } from 'src/common/exception-filters/errors-define';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Car) private carRepository: Repository<Car>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(OrderDetail)
    private orderDetailRepository: Repository<OrderDetail>,
    @InjectRepository(PaymentMethod)
    private paymentMethodRepository: Repository<PaymentMethod>,
    @InjectRepository(MasterCity)
    private masterCityRepository: Repository<MasterCity>,
  ) {}

  async create(createOrderDto: CreateOrderDto, user: any): Promise<Order> {
    const { billing_info, payment_method, rental_info, car_id, total } =
      createOrderDto;

    const user_id: number = user.user_id;

    const [car] = await Promise.all([
      this.checkCarExists(+car_id),
      this.checkCarAvaiable(+car_id, rental_info),
      this.checkCarLocationInvalid(
        +car_id,
        rental_info.pick_up_city_id,
        rental_info.drop_off_city_id,
      ),
      this.checkDateTimeValid(
        rental_info.pick_up_datetime,
        rental_info.drop_off_datetime,
      ),
    ]);

    const payOut: IPayOut = await this.genetatePayout(payment_method);

    const subTotal: number = this.getSubtotal(
      rental_info.pick_up_datetime,
      rental_info.drop_off_datetime,
      DEFAULT_QUANTITY,
      car.price,
      payOut,
    );

    // this.validateTotalCostWithCurrentCost(total, subTotal);

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

    payOut.setAmount(subTotal);
    const payoutStatus: any = payOut.pay();

    const orderResult: Order = await this.orderRepository.save({
      ...newOrder,
      status: payoutStatus,
      total: subTotal,
    });

    if (payOut.pay()) {
      // create new transation.
    } else {
      throw new BadRequestException('order.FEC-0046');
    }

    return { ...orderResult, ...orderDetails, id: newOrder.id };
  }

  async checkCarExists(carId: number): Promise<Car> {
    const car: Car = await this.carRepository.findOne({
      where: { id: +carId },
    });
    if (!car) {
      throw new BadRequestException('app.FEC-0045');
    }

    return car;
  }

  async checkCarAvaiable(carId: number, rentalInfor: any): Promise<boolean> {
    const { pick_up_datetime, drop_off_datetime } = rentalInfor;

    const queryBuilder = this.orderDetailRepository
      .createQueryBuilder('order_details')
      .innerJoin('order_details.order', 'order')
      .where('order_details.car_id = :carId', { carId })
      .andWhere(
        new Brackets((qb) => {
          qb.where(
            'order_details.pick_up_datetime BETWEEN :pick_up_datetime AND :drop_off_datetime',
            {
              pick_up_datetime,
              drop_off_datetime,
            },
          ).orWhere(
            'order_details.drop_off_datetime BETWEEN :pick_up_datetime AND :drop_off_datetime',
            {
              pick_up_datetime,
              drop_off_datetime,
            },
          );
        }),
      )
      .andWhere('order.status IN (:open, :success, :inprogress)', {
        open: OPEN_STATUS,
        success: SUCCESS_STATUS,
        inprogress: INPROGRESS_STATUS,
      });

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

  async checkLocationExists(
    pick_up_location: number,
    drop_off_location: number,
  ): Promise<void> {
    const isExists =
      (await this.masterCityRepository.exist({
        where: { id: pick_up_location },
      })) &&
      (await this.masterCityRepository.exist({
        where: { id: drop_off_location },
      }));

    if (!isExists) {
      throw new BadRequestException('order.FEC-0048');
    }
  }

  async checkCarContainLocations(
    car_id: number,
    pick_up_location: number,
    drop_off_location: number,
  ): Promise<void> {
    const isContain = await this.carRepository
      .createQueryBuilder('cars')
      .innerJoin(
        'cars.car_locations',
        'pick_up_car_locations',
        'pick_up_car_locations.name = :pick_up AND pick_up_car_locations.city_id = :pick_up_location',
        {
          pick_up: PICK_UP,
          pick_up_location,
        },
      )
      .innerJoin(
        'cars.car_locations',
        'drop_off_car_locations',
        'drop_off_car_locations.name = :drop_off AND drop_off_car_locations.city_id = :drop_off_location',
        {
          drop_off: DROP_OFF,
          drop_off_location,
        },
      )
      .where('cars.id = :car_id', { car_id })
      .getExists();

    if (!isContain) {
      throw new BadRequestException('order.FEC-0049');
    }
  }

  async checkCarLocationInvalid(
    car_id: number,
    pick_up_location: number,
    drop_off_location: number,
  ): Promise<void> {
    await this.checkLocationExists(pick_up_location, drop_off_location);
    await this.checkCarContainLocations(
      car_id,
      pick_up_location,
      drop_off_location,
    );
  }

  async genetatePayout(paymentMethodDto: PaymentMethodDto): Promise<IPayOut> {
    const method: PaymentMethod = await this.paymentMethodRepository.findOne({
      where: { id: paymentMethodDto.id },
    });

    if (!method) {
      throw new BadRequestException('order.FEC-0041');
    }
    const payOut: IPayOut = PayoutFactory.generatePayout(method.name);
    payOut.setPayoutInformation(method);

    return payOut;
  }

  validateTotalCostWithCurrentCost(total: number, currentCost: number): void {
    if (total !== currentCost) {
      throw new BadRequestError('order.FEC-0053');
    }
  }

  getSubtotal(
    pick_up_datetime: string,
    drop_off_datetime: string,
    quantity: number,
    price: number,
    payOut: IPayOut,
  ): number {
    const start: number = new Date(pick_up_datetime).getTime();
    const end: number = new Date(drop_off_datetime).getTime();
    const days: number = Math.ceil((end - start) / A_DAY_IN_MILLISECONDS);
    let totalCost: number = price * days;

    const payOutInfor = payOut.getPayoutInformation().informations;
    switch (payOutInfor.type) {
      case 'dorla': {
        totalCost += payOutInfor.tax;
        break;
      }
      case 'percent': {
        totalCost += (payOutInfor.fee * price) / 100;
        break;
      }
    }

    return totalCost;
  }

  async getOrderDetail(id: number, lang: string): Promise<any> {
    const queryBuilder = this.orderBuilderCommon(this.orderRepository, lang)
      .leftJoinAndSelect('order_details.review', 'review')
      .where('orders.id = :id', { id });

    const order = await queryBuilder.getOne();

    if (!order) {
      throw new BadRequestException('order.FEC-0050');
    }

    return order;
  }

  async getOrdersDetail(user: any, lang: string): Promise<any> {
    const queryBuilder = this.orderBuilderCommon(this.orderRepository, lang);
    queryBuilder.innerJoin('orders.user', 'user', 'user.id = :user_id', {
      user_id: user.user_id,
    });
    const orders = await queryBuilder.getMany();

    return orders;
  }

  async getRevenue(fromDate: string, toDate: string): Promise<any> {
    const result = await this.orderDetailRepository
      .createQueryBuilder('order_details')
      .select(
        `YEAR(order_details.pick_up_datetime) AS year, MONTH(order_details.pick_up_datetime) AS month, SUM(orders.total) AS revenue`,
      )
      .leftJoin('order_details.order', 'orders')
      .where('orders.status = :status', { status: 'success' })
      .andWhere(
        'order_details.pick_up_datetime BETWEEN :fromDate AND :toDate',
        { fromDate, toDate },
      )
      .groupBy('year, month')
      .orderBy('year, month', 'ASC')
      .getRawMany();
    console.log({ result });
    return result;
  }

  async getCurrentAndPreviousMonthRevenue(): Promise<any> {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
    const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const currentMonthResult = await this.orderDetailRepository
      .createQueryBuilder('order_details')
      .select('SUM(orders.total) AS revenue')
      .leftJoin('order_details.order', 'orders')
      .where('orders.status = :status', { status: 'success' })
      .andWhere(
        'MONTH(order_details.pick_up_datetime) = :currentMonth AND YEAR(order_details.pick_up_datetime) = :currentYear',
        { currentMonth, currentYear },
      )
      .getRawOne();
    const previousMonthResult = await this.orderDetailRepository
      .createQueryBuilder('order_details')
      .select('SUM(orders.total) AS revenue')
      .leftJoin('order_details.order', 'orders')
      .where('orders.status = :status', { status: 'success' })
      .andWhere(
        'MONTH(order_details.pick_up_datetime) = :previousMonth AND YEAR(order_details.pick_up_datetime) = :previousYear',
        { previousMonth, previousYear },
      )
      .getRawOne();
    console.log({ currentMonthResult, previousMonthResult });
    return {
      currentMonthRevenue: currentMonthResult.revenue,
      previousMonthRevenue: previousMonthResult.revenue,
    };
  }

  orderBuilderCommon(queryBuilder: Repository<Order>, lang: string) {
    return queryBuilder
      .createQueryBuilder('orders')
      .innerJoin('orders.order_order_details', 'order_details')
      .innerJoin('order_details.pick_up_city', 'pick_up_city')
      .innerJoin('order_details.drop_off_city', 'drop_off_city')
      .innerJoin('order_details.car', 'car')
      .innerJoin('car.car_translation', 'car_translation')
      .innerJoin('car.car_types', 'car_types')
      .innerJoin(
        'car_types.master_type',
        'master_type',
        'car_translation.code = :lang',
        { lang },
      )
      .innerJoin(
        'master_type.master_type_translation',
        'master_type_translation',
        'master_type_translation.code = :lang',
        { lang },
      )
      .select(ORDER_DETAIL_SELECT_COLS);
  }
}
