import { Exclude, Expose, Transform, Type } from 'class-transformer';

@Exclude()
export default class CarTypeResponseDto {
  @Expose()
  @Transform(({ obj }) => obj)
  types: string;
}
