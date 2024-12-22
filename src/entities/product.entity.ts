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
  '0.5L' = '0.5L',
  '1L' = '1L',
  '1.5L' = '1.5L',
  '2L' = '2L',
  '3L' = '3L',
  '50G' = '50G',
  '100G' = '100G',
  '150G' = '150G',
  '200G' = '200G',
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
