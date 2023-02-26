import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { MasterCity } from 'src/modules/master-cities/entities/master_city.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'order_details',
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

  @OneToOne(
    () => MasterCity,
    (master_city) => master_city.order_detail_pick_up,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn({
    name: 'pick_up_city_id',
  })
  pick_up_city: MasterCity;

  @OneToOne(
    () => MasterCity,
    (master_city) => master_city.order_detail_drop_off,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn({ name: 'drop_off_city_id' })
  drop_off_city: MasterCity;

  @OneToOne(() => Review, (review) => review.order_detail, {
    createForeignKeyConstraints: false,
  })
  review: Review;
}

export const ORDER_DETAIL_SELECT_COLS = [
  'order_details.id',
  'order_details.created_at',
  'order_details.pick_up_datetime',
  'order_details.drop_off_datetime',
  'order_details.sub_totals',
  'car.id',
  'car.capacity',
  'car.gasoline',
  'car.image_thumbnail',
  'car_types.id',
  'car_translation.name',
  'master_type.id',
  'master_type_translation.id',
  'master_type_translation.name',
  'pick_up_city.id',
  'pick_up_city.name',
  'drop_off_city.id',
  'drop_off_city.name',
];
