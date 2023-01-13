import { Car } from 'src/modules/cars/entities/car.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DateTimeEntity } from '../../../common/base-entity/date-time.entity';

@Entity({
  name: 'car_favorites',
})
export class CarFavorite extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
  })
  user_id: number;

  @Column({
    nullable: true,
  })
  car_id: number;

  @ManyToOne(() => User, (user) => user.car_favorites, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'user_id',
  })
  user: User;

  @ManyToOne(() => Car, (car) => car.favorites, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({
    name: 'car_id',
  })
  car: Car;
}
