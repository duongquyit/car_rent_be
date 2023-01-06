import { Exclude, Expose, Type } from 'class-transformer';
import { CarDto } from './car.dto';

@Exclude()
export class CarsDto {
  @Expose()
  @Type(() => CarDto)
  items: CarDto[];
}
