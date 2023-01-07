import { Exclude, Expose, Type } from 'class-transformer';
import { MasterTypeDto } from './master-type.dto';

@Exclude()
export class MasterTypesDto {
  @Expose()
  @Type(() => MasterTypeDto)
  items: MasterTypeDto[];
}
