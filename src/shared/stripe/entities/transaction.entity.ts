import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import {
  FAILED_STATUS,
  INPROGRESS_STATUS,
  SUCCESS_STATUS,
} from 'src/common/constants/order.constant';
import { Order } from 'src/modules/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'transactions' })
export class Transaction extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  order_id: number;

  @Column({
    nullable: true,
    type: 'mediumtext',
  })
  information: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: [SUCCESS_STATUS, FAILED_STATUS, INPROGRESS_STATUS],
  })
  status: string;

  @OneToMany(() => Order, (order) => order.user, {
    createForeignKeyConstraints: false,
  })
  orders: Order[];

  @ManyToOne(() => Order, (order) => order.order_order_details, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'order_id',
  })
  order: Order;
}
