import { Exclude, Expose, Transform, Type } from 'class-transformer';
import CarTypeResponseDto from 'src/modules/car-types/dto/car-type-response.dto';

@Exclude()
export class CarResponseDto {
  @Expose()
  readonly id: number;

  @Expose()
  readonly capacity: number;

  @Expose()
  readonly gasoline: number;

  @Expose()
  readonly base_price: number;

  @Expose()
  readonly price: number;

  @Expose()
  @Transform(({ obj }) => obj.car_translations[0]?.name)
  readonly car_translation: string;

  @Expose()
  @Transform(({ obj }) => {
    const res = obj.car_types[0].master_type.master_type_translations.map(
      (item: any) => {
        return { id: item.id, name: item.name };
      },
    );
    return res;
  })
  readonly car_types: CarTypeResponseDto;

  @Expose()
  @Transform(({ obj }) => {
    return obj.car_locations.map((item) => ({
      city_id: item.city_id,
      name: item.name,
    }));
  })
  readonly car_locations: any;
}
