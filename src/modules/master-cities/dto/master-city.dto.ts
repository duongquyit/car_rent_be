import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class MasterCityDto {
  @Expose()
  id: number;

  @Expose()
  name: string;
}
