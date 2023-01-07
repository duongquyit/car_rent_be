import { Exclude, Expose, Transform } from 'class-transformer';

@Exclude()
export class MasterTypeTranslationDto {
  @Expose()
  name: string;
}
