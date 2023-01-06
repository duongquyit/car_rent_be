import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MasterTypeTranslationDto {
  @Expose()
  name: string;
}
