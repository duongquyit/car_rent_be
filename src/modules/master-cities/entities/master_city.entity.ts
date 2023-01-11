import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { CarLocation } from 'src/modules/car-locations/entities/car-location.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => CarLocation, (car_location) => car_location.city_id)
  car_locations: CarLocation[];
}
