import { Module } from '@nestjs/common';
import { WholesaleCustomersService } from './wholesale-customers.service';
import { WholesaleCustomersController } from './wholesale-customers.controller';
import { WholesaleCustomer } from 'src/entities/wholesale-customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([WholesaleCustomer])],
  providers: [WholesaleCustomersService],
  controllers: [WholesaleCustomersController],
})
export class WholesaleCustomersModule {}
