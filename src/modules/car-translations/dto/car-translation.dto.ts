import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class CarTranslationDto {
  @Expose()
  name: string;

  @Expose()
  steering: string;
}
