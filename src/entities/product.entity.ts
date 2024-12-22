import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Category } from './category.entity';
import { ProductImage } from './product-image.entity';
import { OrderItem } from './order-item.entity';
import { Manufacturer } from './manufacturers.entity';

export enum BeerType {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum UnitSize {
  'Beer_0.5L' = '0.5L',
  'Beer_1L' = '1L',
  'Beer_1_5L' = '1.5L',
  'Beer_2L' = '2L',
  'Beer_3L' = '3L',

  'Snack_50G' = '50G',
  'Snack_100G' = '100G',
  'Snack_150G' = '150G',
  'Snack_200G' = '200G',
}

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @Column({ type: 'enum', enum: UnitSize, nullable: true })
  unitSize: UnitSize;

  @Column({ type: 'enum', enum: BeerType, nullable: true })
  beerType: BeerType;

  @ManyToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToMany(() => ProductImage, (image) => image.product, { cascade: true })
  images: ProductImage[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  orderItems: OrderItem[];

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.products)
  manufacturer: Manufacturer;
}
