import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { CarLocation } from 'src/modules/car-locations/entities/car-location.entity';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'master_cities',
})
export class MasterCity extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: true,
    type: 'varchar',
    length: 50,
  })
  name: string;

  @OneToMany(() => CarLocation, (car_location) => car_location.city)
  car_locations: CarLocation[];

  @OneToOne(() => OrderDetail, (order_detail) => order_detail.pick_up_city, {
    createForeignKeyConstraints: false,
  })
  order_detail_pick_up: OrderDetail;

  @OneToOne(() => OrderDetail, (order_detail) => order_detail.drop_off_city, {
    createForeignKeyConstraints: false,
  })
  order_detail_drop_off: OrderDetail;
}
