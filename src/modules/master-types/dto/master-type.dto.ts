import { Exclude, Expose, Type } from 'class-transformer';
import { MasterTypeTranslationDto } from 'src/modules/master-type-translations/dto/master-type-translation.dto';

@Exclude()
export class MasterTypeDto {
  @Expose()
  @Type(() => MasterTypeTranslationDto)
  master_type_tranlation: MasterTypeTranslationDto;
}
