import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateWholesaleOrderDto } from 'src/dto/wholesale-order/wholesale-order.dto';
import { WholesaleOrdersService } from './wholesale-orders.service';
import { RequestWithUser } from 'src/_types/user';
import { WholesaleOrder } from 'src/entities/wholesale-order.entity';

@Controller('wholesale-orders')
export class WholesaleOrdersController {
  constructor(
    private readonly wholesaleOrdersService: WholesaleOrdersService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createWholesaleOrder(
    @Body() createWholesaleOrderDto: CreateWholesaleOrderDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.wholesaleOrdersService.createWholesaleOrder(
      createWholesaleOrderDto,
      userId,
    );
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllWholesaleOrders(
    @Req() req: RequestWithUser,
  ): Promise<WholesaleOrder[]> {
    const userId = req.user.id;
    return this.wholesaleOrdersService.getAllWholesaleOrders(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getWholesaleOrderById(
    @Param('id') id: number,
  ): Promise<WholesaleOrder> {
    return this.wholesaleOrdersService.getWholesaleOrderById(id);
  }
}
