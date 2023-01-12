import { Exclude, Expose, Type } from 'class-transformer';
import { MasterCityDto } from './master-city.dto';

@Exclude()
export class MasterCitiesDto {
  @Expose()
  @Type(() => MasterCityDto)
  items: MasterCityDto[];
}
