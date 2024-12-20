import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category } from 'src/entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @Post()
  async create(@Body() categoryData: Category): Promise<Category> {
    return this.categoriesService.create(categoryData);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.categoriesService.remove(id);
  }

  @Post('initialize')
  async initializeCategories(): Promise<string> {
    const existingBeerCategory =
      await this.categoriesService.findOneByName('beer');
    const existingSnacksCategory =
      await this.categoriesService.findOneByName('snacks');

    if (!existingBeerCategory) {
      await this.categoriesService.create({ name: 'beer' });
    }

    if (!existingSnacksCategory) {
      await this.categoriesService.create({ name: 'snacks' });
    }

    return 'Categories "beer" and "snacks" created successfully';
  }
}
