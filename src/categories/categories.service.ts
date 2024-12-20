import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from 'src/entities/category.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoriesRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    return this.categoriesRepository.findOne({ where: { id } });
  }
  async create(categoryData: Partial<Category>): Promise<Category> {
    const newCategory = this.categoriesRepository.create(categoryData);
    return this.categoriesRepository.save(newCategory);
  }
  async remove(id: number): Promise<void> {
    await this.categoriesRepository.delete(id);
  }

  async findOneByName(name: string): Promise<Category | null> {
    return this.categoriesRepository.findOne({
      where: { name },
    });
  }
}
