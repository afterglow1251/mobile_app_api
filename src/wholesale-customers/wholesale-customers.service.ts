import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WholesaleCustomer } from 'src/entities/wholesale-customer.entity';
import { CreateWholesaleCustomerDto } from 'src/dto/wholesale-customer/create.dto';

@Injectable()
export class WholesaleCustomersService {
  constructor(
    @InjectRepository(WholesaleCustomer)
    private readonly wholesaleCustomerRepository: Repository<WholesaleCustomer>,
  ) {}

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
    return this.wholesaleCustomerRepository.find();
  }

  async findOne(id: number): Promise<WholesaleCustomer> {
    return this.wholesaleCustomerRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateDto: any): Promise<WholesaleCustomer> {
    await this.wholesaleCustomerRepository.update(id, updateDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.wholesaleCustomerRepository.delete(id);
  }
}
