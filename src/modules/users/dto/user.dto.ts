import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
  @Expose()
  id: string;

  @Expose()
  first_name: string;

  @Expose()
  last_name: string;

  @Expose()
  email: string;

  @Expose()
  position: string;

  @Expose()
  avatar_path: string;

  @Expose()
  username: string;

  @Expose()
  address: string;

  @Expose()
  phone_number: string;
}
