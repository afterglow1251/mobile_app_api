import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from './product.entity';

@Entity('manufacturers')
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @OneToMany(() => Product, (product) => product.manufacturer)
  products: Product[];
}
