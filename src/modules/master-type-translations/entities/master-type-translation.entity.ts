import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { MasterLanguage } from 'src/modules/master-languages/entities/master-language.entity';
import { MasterType } from 'src/modules/master-types/entities/master_type.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'master_type_translations',
})
export class MasterTypeTranslation extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'int',
  })
  type_id: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 10,
  })
  code: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 50,
  })
  name: number;

  @ManyToOne(() => MasterType, (master_type) => master_type.types, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn({ name: 'type_id' })
  master_type: MasterType;

  @ManyToOne(
    () => MasterLanguage,
    (master_language) => master_language.master_type_translations,
    {
      createForeignKeyConstraints: false,
    },
  )
  @JoinColumn({ name: 'code', referencedColumnName: 'code' })
  master_language: MasterType;
}
