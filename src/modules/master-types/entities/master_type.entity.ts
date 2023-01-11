import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { CarType } from 'src/modules/car-types/entities/car-type.entity';
import { MasterTypeTranslation } from 'src/modules/master-type-translations/entities/master-type-translation.entity';
import { Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'master_types',
})
export class MasterType extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CarType, (car_type) => car_type.master_type, {
    createForeignKeyConstraints: false,
  })
  types: CarType[];

  @OneToMany(
    () => MasterTypeTranslation,
    (master_type_tran) => master_type_tran.master_type,
    {
      createForeignKeyConstraints: false,
    },
  )
  master_type_translations: MasterTypeTranslation[];
}
