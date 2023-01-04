import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class DateTimeEntity {
  @CreateDateColumn({
    type: 'datetime',
    nullable: true,
  })
  created_at: string;

  @UpdateDateColumn({
    type: 'datetime',
    nullable: true,
  })
  updated_at: string;

  @DeleteDateColumn({
    type: 'datetime',
    nullable: true,
  })
  deleted_at: string;
}
