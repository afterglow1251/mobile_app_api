import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { ProductImage } from 'src/entities/product-image.entity';
import { Manufacturer } from 'src/entities/manufacturers.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, ProductImage, Manufacturer]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
