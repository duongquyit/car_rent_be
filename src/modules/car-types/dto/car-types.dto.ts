import { Exclude, Expose, Type } from 'class-transformer';
import { CarTypeDto } from './car-type.dto';

@Exclude()
export class CarTypesDto {
  @Expose()
  @Type(() => CarTypeDto)
  master_type: CarTypeDto[];
}
