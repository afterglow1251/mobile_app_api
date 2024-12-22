import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ConflictException,
} from '@nestjs/common';
import { WholesaleCustomersService } from './wholesale-customers.service';
import { WholesaleCustomer } from 'src/entities/wholesale-customer.entity';
import { CreateWholesaleCustomerDto } from 'src/dto/wholesale-customer/create.dto';
import { UpdateWholesaleCustomerDto } from 'src/dto/wholesale-customer/update.dto';

@Controller('wholesale-customers')
export class WholesaleCustomersController {
  constructor(
    private readonly wholesaleCustomersService: WholesaleCustomersService,
  ) {}

  @Get()
  async findAll(): Promise<WholesaleCustomer[]> {
    return this.wholesaleCustomersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<WholesaleCustomer> {
    return this.wholesaleCustomersService.findOne(id);
  }

  @Post()
  async create(
    @Body() createDto: CreateWholesaleCustomerDto,
  ): Promise<WholesaleCustomer> {
    try {
      return await this.wholesaleCustomersService.create(createDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateWholesaleCustomerDto,
  ): Promise<WholesaleCustomer> {
    try {
      return await this.wholesaleCustomersService.update(id, updateDto);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw new ConflictException(error.message);
      }
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.wholesaleCustomersService.remove(id);
  }
}
