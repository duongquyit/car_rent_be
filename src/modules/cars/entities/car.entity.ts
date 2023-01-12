import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { CarImage } from 'src/modules/car-images/entities/car-image.entity';
import { CarLocation } from 'src/modules/car-locations/entities/car-location.entity';
import { CarTranslation } from 'src/modules/car-translations/entities/car-translation.entity';
import { CarType } from 'src/modules/car-types/entities/car-type.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'cars',
})
export class Car extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  capacity: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  gasoline: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  base_price: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ type: 'nvarchar', nullable: true })
  image_thumbnail: string;

  @OneToMany(() => CarLocation, (car_location) => car_location.car, {
    createForeignKeyConstraints: false,
  })
  car_locations: CarLocation[];

  @OneToOne(() => CarTranslation, (car_translation) => car_translation.car, {
    createForeignKeyConstraints: false,
  })
  car_translation: CarTranslation;

  @OneToMany(() => CarType, (car_type) => car_type.car, {
    createForeignKeyConstraints: false,
  })
  car_types: CarType[];

  @OneToMany(() => CarImage, (car_image) => car_image.car, {
    createForeignKeyConstraints: false,
  })
  car_images: CarImage[];

  @OneToMany(() => Review, (review) => review.car, {
    createForeignKeyConstraints: false,
  })
  reviews: Review[];
}
