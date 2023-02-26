import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'reviews',
})
export class Review extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  order_detail_id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  user_id: number;

  @Column({
    nullable: true,
    type: 'mediumtext',
  })
  content: string;

  @Column({
    nullable: true,
    type: 'tinyint',
  })
  stars: number;

  @ManyToOne(() => User, (user) => user.reviews, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.review, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'order_detail_id' })
  order_detail: OrderDetail;
}
