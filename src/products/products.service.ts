import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { ProductImage } from 'src/entities/product-image.entity';
import { CustomHttpException } from 'src/errors/custom-http.exception';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(ProductImage)
    private productImagesRepository: Repository<ProductImage>,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find({
      relations: ['category', 'images'],
    });
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'images'],
    });
  }

  async create(productData: Product): Promise<Product> {
    const newProduct = this.productsRepository.create(productData);
    return this.productsRepository.save(newProduct);
  }

  async update(id: number, productData: Product): Promise<Product> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ['category', 'images'],
    });

    if (!product) {
      throw new CustomHttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.productsRepository.save({ ...product, ...productData });
  }

  async remove(id: number): Promise<void> {
    await this.productsRepository.delete(id);
  }

  async findByCategory(categoryName: string): Promise<Product[]> {
    return this.productsRepository.find({
      where: { category: { name: categoryName } },
      relations: ['category', 'images'],
    });
  }
}
