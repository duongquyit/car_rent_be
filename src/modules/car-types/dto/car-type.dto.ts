import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CarTypeDto {
  @Expose()
  id: number;

  @Expose()
  car_id: number;

  @Expose()
  type_id: number;
}
