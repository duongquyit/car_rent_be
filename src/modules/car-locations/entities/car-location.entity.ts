import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { MasterCity } from 'src/modules/master-cities/entities/master_city.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'car_locations',
})
export class CarLocation extends DateTimeEntity {
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
  city_id: number;

  @Column({
    nullable: true,
    type: 'enum',
    enum: ['pick_up', 'drop_off'],
  })
  name: string;

  @ManyToOne(() => Car, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(() => MasterCity, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'city_id' })
  city: MasterCity;
}
