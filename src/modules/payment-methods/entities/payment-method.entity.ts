import { DateTimeEntity } from 'src/common/base-entity/date-time.entity';
import { Order } from 'src/modules/orders/entities/order.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'payment_methods',
})
export class PaymentMethod extends DateTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 30,
  })
  name: string;

  @Column({
    nullable: true,
    type: 'json',
  })
  informations: object;

  @OneToMany(() => Order, (order) => order.payment_method, {
    createForeignKeyConstraints: false,
  })
  orders: Order[];
}
