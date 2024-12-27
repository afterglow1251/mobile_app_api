import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateWholesaleOrderDto } from 'src/dto/wholesale-order/wholesale-order.dto';
import { WholesaleOrdersService } from './wholesale-orders.service';
import { WholesaleOrder } from 'src/entities/wholesale-order.entity';
import { accessToken } from 'src/constants/swagger.constants';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('wholesale-orders')
@ApiBearerAuth(accessToken)
export class WholesaleOrdersController {
  constructor(
    private readonly wholesaleOrdersService: WholesaleOrdersService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createWholesaleOrder(
    @Body() createWholesaleOrderDto: CreateWholesaleOrderDto,
  ) {
    return this.wholesaleOrdersService.createWholesaleOrder(
      createWholesaleOrderDto,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllWholesaleOrders(): Promise<WholesaleOrder[]> {
    return this.wholesaleOrdersService.getAllWholesaleOrders();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getWholesaleOrderById(
    @Param('id') id: number,
  ): Promise<WholesaleOrder> {
    return this.wholesaleOrdersService.getWholesaleOrderById(id);
  }

  @Get('customer/:customerId/latest')
  @UseGuards(JwtAuthGuard)
  async getLatestOrdersByCustomer(
    @Param('customerId') customerId: number,
  ): Promise<WholesaleOrder[]> {
    return this.wholesaleOrdersService.getLatestOrdersByCustomer(customerId);
  }

  @Get('customer/:customerId/all')
  @UseGuards(JwtAuthGuard)
  async getAllOrdersByCustomer(
    @Param('customerId') customerId: number,
  ): Promise<WholesaleOrder[]> {
    return this.wholesaleOrdersService.getAllOrdersByCustomer(customerId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteWholesaleOrder(
    @Param('id') id: number,
  ): Promise<{ message: string }> {
    await this.wholesaleOrdersService.deleteWholesaleOrder(id);
    return { message: 'Order deleted successfully' };
  }

  // test
  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateWholesaleOrder(
    @Param('id') id: number,
    @Body() updateWholesaleOrderDto: any,
  ): Promise<WholesaleOrder> {
    return this.wholesaleOrdersService.updateWholesaleOrder(
      id,
      updateWholesaleOrderDto,
    );
  }
}
