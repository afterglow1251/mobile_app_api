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

  @Column({ nullable: true })
  unitSize: number;

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
