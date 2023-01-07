import { Exclude, Expose, Type } from 'class-transformer';
import { CarDto } from './car.dto';
import { PanigationType } from 'src/helpers/panigation.helper';

@Exclude()
export class CarsDto {
  @Expose()
  @Type(() => CarDto)
  items: CarDto[];

  @Expose()
  panigation: PanigationType;
}
