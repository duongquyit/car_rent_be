import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone_number: string;

  @Column()
  avatar: string;

  @Column()
  position: string;
}
