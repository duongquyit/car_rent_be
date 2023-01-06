import { Exclude, Expose } from 'class-transformer';
import { MasterTypeTranslationDto } from 'src/modules/master-type-translations/entities/master-type-translation.dto';

@Exclude()
export class MasterTypeDto {
  @Expose()
  master_type_tranlation: MasterTypeTranslationDto;
}
