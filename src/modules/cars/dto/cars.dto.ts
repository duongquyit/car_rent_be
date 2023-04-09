import { Exclude, Expose, Type } from 'class-transformer';
import { CarDto } from './car.dto';
import { Pagination } from 'src/common/helpers/pagination.helper';

@Exclude()
export class CarsDto {
  @Expose()
  @Type(() => CarDto)
  items: CarDto[];

  @Expose()
  pagination: Pagination;
}
