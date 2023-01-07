import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { MasterTypeTranslationDto } from 'src/modules/master-type-translations/dto/master-type-translation.dto';

@Exclude()
export class CarTypeDto {
  @Expose()
  readonly id: number;

  @Expose()
  @Type(() => MasterTypeTranslationDto)
  readonly master_type_translation: MasterTypeTranslationDto;
}
