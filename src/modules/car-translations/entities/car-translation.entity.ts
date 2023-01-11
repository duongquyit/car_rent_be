import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Car } from 'src/modules/cars/entities/car.entity';
import { MasterLanguage } from 'src/modules/master-languages/entities/master-language.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'car_translations',
})
export class CarTranslation extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  car_id: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 10,
  })
  code: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  @Index({ fulltext: true })
  name: string;

  @Column({
    nullable: true,
    type: 'mediumtext',
  })
  description: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
  })
  steering: string;

  @ManyToOne(() => Car, (car) => car.car_translations, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'car_id' })
  car: Car;

  @ManyToOne(
    () => MasterLanguage,
    (master_language) => master_language.master_type_translations,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn({ name: 'code', referencedColumnName: 'code' })
  master_language: MasterLanguage;
}
