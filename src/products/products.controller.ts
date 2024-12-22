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
import { ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { accessToken } from 'src/constants/swagger.constants';

@Controller('products')
@ApiBearerAuth(accessToken)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiQuery({
    name: 'name',
    required: false,
    description: 'The name of the product',
    type: String,
  })
  @ApiQuery({
    name: 'minPrice',
    required: false,
    description: 'The minimum price of the product',
    type: Number,
  })
  @ApiQuery({
    name: 'maxPrice',
    required: false,
    description: 'The maximum price of the product',
    type: Number,
  })
  @ApiQuery({
    name: 'unitSize',
    required: false,
    description: 'The unit size of the product (can be an array)',
    type: String,
  })
  @ApiQuery({
    name: 'beerType',
    required: false,
    description: 'The type of beer (can be an array)',
    type: String,
  })
  @ApiQuery({
    name: 'manufacturerName',
    required: false,
    description: 'The name of the manufacturer (can be an array)',
    type: String,
  })
  @ApiQuery({
    name: 'manufacturerCountry',
    required: false,
    description: 'The country of the manufacturer (can be an array)',
    type: String,
  })
  @ApiQuery({
    name: 'category',
    required: false,
    description:
      'The category of the product (can be an array like beer, snack)',
    type: String,
  })
  async findAll(
    @Query('name') name?: string,
    @Query('minPrice') minPrice?: number,
    @Query('maxPrice') maxPrice?: number,
    @Query('unitSize') unitSize?: string,
    @Query('beerType') beerType?: string,
    @Query('manufacturerName') manufacturerName?: string,
    @Query('manufacturerCountry') manufacturerCountry?: string,
    @Query('category') category?: string,
  ): Promise<Product[]> {
    const unitSizeArray = unitSize ? unitSize.split(',') : undefined;
    const beerTypeArray = beerType ? beerType.split(',') : undefined;
    const manufacturerNameArray = manufacturerName
      ? manufacturerName.split(',')
      : undefined;
    const manufacturerCountryArray = manufacturerCountry
      ? manufacturerCountry.split(',')
      : undefined;
    const categoryArray = category ? category.split(',') : undefined;

    return this.productsService.findFiltered({
      name,
      minPrice,
      maxPrice,
      unitSize: unitSizeArray,
      beerType: beerTypeArray,
      manufacturerName: manufacturerNameArray,
      manufacturerCountry: manufacturerCountryArray,
      category: categoryArray,
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
