import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WholesaleOrder } from './wholesale_order.dto';

@Entity('wholesale_customers')
export class WholesaleCustomer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column({ length: 15 })
  phoneNumber: string;

  @OneToMany(() => WholesaleOrder, (order) => order.customer)
  orders: WholesaleOrder[];
}
