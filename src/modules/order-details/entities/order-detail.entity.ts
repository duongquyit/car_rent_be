import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'order-details',
})
export class OrderDetail extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  order_id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  car_id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  quantity: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  pick_up_city_id: number;

  @Column({
    nullable: true,
    type: 'datetime',
  })
  pick_up_datetime: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  drop_off_city_id: number;

  @Column({
    nullable: true,
    type: 'datetime',
  })
  drop_off_datetime: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  sub_totals: number;

  @ManyToOne(() => Car, (car) => car.order_details, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'car_id',
  })
  car: Car;

  @ManyToOne(() => Order, (order) => order.order_order_details, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}
