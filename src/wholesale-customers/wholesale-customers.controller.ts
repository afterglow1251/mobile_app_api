import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  ConflictException,
  Patch,
} from '@nestjs/common';
import { WholesaleCustomersService } from './wholesale-customers.service';
import { WholesaleCustomer } from 'src/entities/wholesale-customer.entity';
import { CreateWholesaleCustomerDto } from 'src/dto/wholesale-customer/create.dto';
import { UpdateWholesaleCustomerDto } from 'src/dto/wholesale-customer/update.dto';
import { accessToken } from 'src/constants/swagger.constants';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('wholesale-customers')
@ApiBearerAuth(accessToken)
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
    return this.wholesaleCustomersService.create(createDto);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateWholesaleCustomerDto,
  ): Promise<WholesaleCustomer> {
    return this.wholesaleCustomersService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.wholesaleCustomersService.remove(id);
  }
}
