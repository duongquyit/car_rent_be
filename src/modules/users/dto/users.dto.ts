import { Exclude, Expose, Type } from 'class-transformer';
import { UserDto } from './user.dto';
import { Pagination } from 'src/common/helpers/pagination.helper';

@Exclude()
export class UsersDto {
  @Expose()
  @Type(() => UserDto)
  items: UserDto[];

  @Expose()
  pagination: Pagination;
}
