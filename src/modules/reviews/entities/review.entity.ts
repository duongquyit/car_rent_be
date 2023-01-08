import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
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
  car_id: number;

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

  @ManyToOne(() => Car, (car) => car.reviews, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => User, (user) => user.reviews, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
