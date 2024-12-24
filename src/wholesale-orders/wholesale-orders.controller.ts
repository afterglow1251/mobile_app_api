import { Body, Controller, Post, UseGuards, Get, Param } from '@nestjs/common';
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
}
