import { Exclude, Expose, Type } from 'class-transformer';
import { CarTranslationDto } from 'src/modules/car-translations/dto/car-translation.dto';
import { CarTypesDto } from 'src/modules/car-types/dto/car-types.dto';

@Exclude()
export class CarDto {
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
  @Type(() => CarTranslationDto)
  car_translation: CarTranslationDto;

  @Expose()
  @Type(() => CarTypesDto)
  car_types: CarTypesDto;
}
