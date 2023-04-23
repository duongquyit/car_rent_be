import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { CarFavorite } from 'src/modules/car-favorites/entities/car-favorite.entity';
import { CarImage } from 'src/modules/car-images/entities/car-image.entity';
import { CarLocation } from 'src/modules/car-locations/entities/car-location.entity';
import { CarTranslation } from 'src/modules/car-translations/entities/car-translation.entity';
import { CarType } from 'src/modules/car-types/entities/car-type.entity';
import { OrderDetail } from 'src/modules/order-details/entities/order-detail.entity';
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
  base_price: number;

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

  @OneToMany(() => OrderDetail, (order_detail) => order_detail.car, {
    createForeignKeyConstraints: false,
  })
  order_details: OrderDetail[];

  @OneToMany(() => CarFavorite, (car_favorite) => car_favorite.car, {
    createForeignKeyConstraints: false,
  })
  favorites: CarFavorite[];
}

export const SELECT_COL_DEFAULT = [
  'cars.id',
  'cars.capacity',
  'cars.gasoline',
  'cars.base_price',
  'cars.price',
  'cars.image_thumbnail',
  'master_type_translation.id',
  'master_type_translation.name',
  'car_translation.id',
  'car_translation.name',
  'car_translation.steering',
  'car_types.id',
  'car_types.car_id',
  'car_types.type_id',
  'master_type.id',
];

export const SELECT_CAR_IMAGES_COL = ['car_images.path', 'car_images.id'];

export const SELECT_CAR_DESCRIPTION_COL = ['car_translation.description'];

export const SELECT_CAR_FAVORITES_COL = ['favorites.user_id'];
