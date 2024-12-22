import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { WholesaleOrder } from './wholesale-order.entity';
import { Product } from './product.entity';

@Entity('wholesale_order_items')
export class WholesaleOrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => WholesaleOrder, (order) => order.orderItems)
  order: WholesaleOrder;

  @ManyToOne(() => Product, (product) => product.orderItems)
  product: Product;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}
