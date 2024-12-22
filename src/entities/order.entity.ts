import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  totalPrice: number;

  @Column()
  shippingAddress: string;

  @Column({
    type: 'enum',
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  })
  status: string;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems: OrderItem[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
