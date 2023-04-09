import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { MasterType } from 'src/modules/master-types/entities/master_type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'car_types',
})
export class CarType extends DateTimeEntity {
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
  type_id: number;

  @ManyToOne(() => MasterType, (master_type) => master_type.types, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'type_id' })
  master_type: MasterType;

  @ManyToOne(() => Car, (car) => car.car_types, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_id' })
  car: Car;
}
