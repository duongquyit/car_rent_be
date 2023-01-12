import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ResponseDto {
  @Expose()
  readonly data: any;
}
