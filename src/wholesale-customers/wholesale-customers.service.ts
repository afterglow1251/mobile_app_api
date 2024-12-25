import { Injectable, ConflictException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WholesaleCustomer } from 'src/entities/wholesale-customer.entity';
import { CreateWholesaleCustomerDto } from 'src/dto/wholesale-customer/create.dto';
import { CustomHttpException } from 'src/errors/custom-http.exception';

@Injectable()
export class WholesaleCustomersService {
  constructor(
    @InjectRepository(WholesaleCustomer)
    private readonly wholesaleCustomerRepository: Repository<WholesaleCustomer>,
  ) {}

  private async checkExists(id: number): Promise<void> {
    const existingCustomer = await this.wholesaleCustomerRepository.findOne({
      where: { id },
    });

    if (!existingCustomer) {
      throw new CustomHttpException(
        'Wholesale customer not found',
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(
    createDto: CreateWholesaleCustomerDto,
  ): Promise<WholesaleCustomer> {
    const existingCustomer = await this.wholesaleCustomerRepository.findOne({
      where: { phoneNumber: createDto.phoneNumber },
    });
    if (existingCustomer) {
      throw new ConflictException(
        'A customer with this phone number already exists.',
      );
    }

    const customer = this.wholesaleCustomerRepository.create(createDto);
    return this.wholesaleCustomerRepository.save(customer);
  }

  async findAll(): Promise<WholesaleCustomer[]> {
    return this.wholesaleCustomerRepository.find({
      relations: ['orders'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: number): Promise<WholesaleCustomer> {
    await this.checkExists(id);
    return this.wholesaleCustomerRepository.findOne({
      where: { id },
    });
  }

  async update(
    id: number,
    updateDto: Partial<WholesaleCustomer>,
  ): Promise<WholesaleCustomer> {
    await this.checkExists(id);

    try {
      await this.wholesaleCustomerRepository.update(id, updateDto);
      return await this.findOne(id);
    } catch (error) {
      throw new CustomHttpException(
        'Failed to update wholesale customer. Please try again.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<void> {
    await this.checkExists(id);
    await this.wholesaleCustomerRepository.delete(id);
  }
}
