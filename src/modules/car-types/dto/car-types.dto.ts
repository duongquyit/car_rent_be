import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { CarTypeDto } from './car-type.dto';

@Exclude()
export class CarTypesDto {
  @Expose()
  @Type(() => CarTypeDto)
  types: CarTypeDto[];
}
