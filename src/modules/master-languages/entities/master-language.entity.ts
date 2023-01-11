import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { CarTranslation } from 'src/modules/car-translations/entities/car-translation.entity';
import { MasterTypeTranslation } from 'src/modules/master-type-translations/entities/master-type-translation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'master_languages',
})
export class MasterLanguage extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    nullable: true,
    type: 'varchar',
    length: 10,
  })
  code: string;

  @OneToMany(
    () => CarTranslation,
    (car_translation) => car_translation.master_language,
  )
  car_translations: CarTranslation[];

  @OneToMany(
    () => MasterTypeTranslation,
    (master_type_translation) => master_type_translation.master_type,
  )
  master_type_translations: MasterTypeTranslation[];
}
