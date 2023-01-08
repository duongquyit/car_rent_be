import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Review } from 'src/modules/reviews/entities/review.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  first_name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  last_name: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
    unique: true,
  })
  email: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  password: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
  })
  address: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 15,
  })
  phone_number: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255,
  })
  avatar_path: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
  })
  position: string;

  @OneToMany(() => Review, (reviews) => reviews.user, {
    createForeignKeyConstraints: false,
  })
  reviews: Review[];
}
