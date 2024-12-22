import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from 'src/entities/product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  async findAll(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('unitSize') unitSize?: string,
    @Query('beerType') beerType?: string,
    @Query('manufacturerName') manufacturerName?: string,
    @Query('manufacturerCountry') manufacturerCountry?: string,
  ): Promise<Product[]> {
    return this.productsService.findFiltered({
      name,
      minPrice,
      maxPrice,
      unitSize,
      beerType,
      manufacturerName,
      manufacturerCountry,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Product> {
    return this.productsService.findOne(id);
  }

  @Post()
  async create(@Body() productData: Product): Promise<Product> {
    return this.productsService.create(productData);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() productData: Product,
  ): Promise<Product> {
    return this.productsService.update(id, productData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.productsService.remove(id);
  }

  @Get('category/:categoryName')
  async findByCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<Product[]> {
    return this.productsService.findByCategory(categoryName);
  }
}
