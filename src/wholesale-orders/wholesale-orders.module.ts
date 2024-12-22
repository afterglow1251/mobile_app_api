import { Module } from '@nestjs/common';
import { WholesaleOrdersService } from './wholesale-orders.service';
import { WholesaleOrdersController } from './wholesale-orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/entities/product.entity';
import { WholesaleOrderItem } from 'src/entities/wholesale-order-item.entity';
import { WholesaleOrder } from 'src/entities/wholesale-order.entity';
import { WholesaleCustomer } from 'src/entities/wholesale-customer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      WholesaleOrder,
      WholesaleOrderItem,
      WholesaleCustomer,
      Product,
    ]),
  ],
  providers: [WholesaleOrdersService],
  controllers: [WholesaleOrdersController],
})
export class WholesaleOrdersModule {}
