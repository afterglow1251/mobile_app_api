import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { WholesaleCustomer } from './wholesale-customer.entity';
import { WholesaleOrderItem } from './wholesale-order-item.entity';

@Entity('wholesale_orders')
export class WholesaleOrder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => WholesaleCustomer, (customer) => customer.orders)
  customer: WholesaleCustomer;

  @OneToMany(() => WholesaleOrderItem, (orderItem) => orderItem.order)
  orderItems: WholesaleOrderItem[];

  @Column({
    type: 'enum',
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
