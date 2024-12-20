import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { ProductImage } from 'src/entities/product-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, ProductImage])],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
