import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';
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
    nullable: false,
    type: 'int',
  })
  user_id: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  payment_method_id: number;

  @Column({
    nullable: false,
    type: 'int',
  })
  promotion_id: number;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 30,
  })
  bill_name: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 30,
  })
  bill_phone_number: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 30,
  })
  bill_address: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 30,
  })
  bill_city: string;

  @Column({
    nullable: false,
    type: 'varchar',
    length: 50,
  })
  bill_promo_code: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ['percent', 'absolute'],
  })
  bill_promo_type: string;

  @Column({
    nullable: false,
    type: 'datetime',
  })
  bill_promo_datetime_start: string;

  @Column({
    nullable: false,
    type: 'datetime',
  })
  bill_promo_datetime_end: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
  })
  total: number;

  @Column({
    nullable: false,
    type: 'enum',
    enum: ['open', 'inprogress', 'success', 'failed'],
  })
  status: string;

  @OneToMany(() => OrderDetail, (order_detail) => order_detail.order, {
    createForeignKeyConstraints: false,
  })
  order_order_details: OrderDetail[];

  @ManyToOne(() => User, (user) => user.orders, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
