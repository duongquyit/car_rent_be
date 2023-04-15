import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';
import { PaymentMethod } from 'src/modules/payment-methods/entities/payment-method.entity';
import { Transaction } from 'src/shared/stripe/entities/transaction.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'orders',
})
export class Order extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  user_id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  payment_method_id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  promotion_id: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  bill_name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  bill_phone_number: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  bill_address: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  bill_city: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
  })
  bill_promo_code: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['percent', 'absolute'],
  })
  bill_promo_type: string;

  @Column({
    nullable: true,
    type: 'datetime',
  })
  bill_promo_datetime_start: string;

  @Column({
    nullable: true,
    type: 'datetime',
  })
  bill_promo_datetime_end: string;

  @Column({
    nullable: true,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['open', 'inprogress', 'success', 'failed'],
  })
  status: string;

  @OneToMany(() => OrderDetail, (order_detail) => order_detail.order, {
    createForeignKeyConstraints: false,
  })
  order_order_details: OrderDetail[];

  @OneToMany(() => Transaction, (transaction) => transaction.order_id, {
    createForeignKeyConstraints: false,
  })
  order_transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => PaymentMethod, (payment_method) => payment_method.orders, {
    createForeignKeyConstraints: false,
  })
  payment_method: PaymentMethod;
}

export const ORDER_DETAIL_SELECT_COLS = [
  'orders.id',
  'orders.total',
  'order_details.id',
  'order_details.pick_up_datetime',
  'order_details.drop_off_datetime',
  'pick_up_city.name',
  'drop_off_city.name',
  'car.id',
  'car.image_thumbnail',
  'car_translation.name',
  'car_translation.steering',
  'car_types.type_id',
  'master_type.id',
  'master_type_translation.name',
];
