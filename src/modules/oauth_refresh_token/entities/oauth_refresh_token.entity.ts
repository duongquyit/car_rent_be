import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'oauth_refresh_tokens',
})
export class OauthRefreshToken extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'mediumtext',
  })
  refresh_token: string;

  @Column({
    nullable: true,
    type: 'int',
  })
  user_id: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 20,
  })
  expired_in: string;
}
