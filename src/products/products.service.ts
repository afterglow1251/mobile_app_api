import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/entities/product.entity';
import { Category } from 'src/entities/category.entity';
import { ProductImage } from 'src/entities/product-image.entity';
import { CustomHttpException } from 'src/errors/custom-http.exception';
import { Manufacturer } from 'src/entities/manufacturers.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(ProductImage)
    private productImagesRepository: Repository<ProductImage>,
    @InjectRepository(Manufacturer)
    private manufacturersRepository: Repository<Manufacturer>,
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

  async findFiltered(filters: {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
    unitSize?: string[];
    beerType?: string[];
    manufacturerName?: string[];
    manufacturerCountry?: string[];
    category?: string[];
  }): Promise<Product[]> {
    const queryBuilder = this.productsRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .leftJoinAndSelect('product.images', 'images')
      .leftJoinAndSelect('product.manufacturer', 'manufacturer');

    if (filters.name) {
      queryBuilder.andWhere('LOWER(product.name) LIKE LOWER(:name)', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.minPrice) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: filters.minPrice,
      });
    }

    if (filters.maxPrice) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: filters.maxPrice,
      });
    }

    if (filters.unitSize && filters.unitSize.length > 0) {
      queryBuilder.andWhere('product.unitSize IN (:...unitSizes)', {
        unitSizes: filters.unitSize,
      });
    }

    if (filters.beerType && filters.beerType.length > 0) {
      queryBuilder.andWhere('product.beerType IN (:...beerTypes)', {
        beerTypes: filters.beerType,
      });
    }

    if (filters.manufacturerName && filters.manufacturerName.length > 0) {
      queryBuilder.andWhere(
        'LOWER(manufacturer.name) IN (:...manufacturerNames)',
        {
          manufacturerNames: filters.manufacturerName,
        },
      );
    }

    if (filters.manufacturerCountry && filters.manufacturerCountry.length > 0) {
      queryBuilder.andWhere(
        'LOWER(manufacturer.country) IN (:...manufacturerCountries)',
        {
          manufacturerCountries: filters.manufacturerCountry,
        },
      );
    }

    if (filters.category && filters.category.length > 0) {
      queryBuilder.andWhere('category.name IN (:...categories)', {
        categories: filters.category,
      });
    }

    return queryBuilder.getMany();
  }
}
