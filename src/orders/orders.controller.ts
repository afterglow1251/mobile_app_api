import { Body, Controller, Post, UseGuards, Req, Get } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CreateOrderDto } from 'src/dto/order/order.dto';
import { OrdersService } from './orders.service';
import { RequestWithUser } from 'src/_types/user';
import { accessToken } from 'src/constants/swagger.constants';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('orders')
@ApiBearerAuth(accessToken)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @Req() req: RequestWithUser,
  ) {
    const userId = req.user.id;
    return this.ordersService.createOrder(createOrderDto, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllOrders(@Req() req: RequestWithUser) {
    const userId = req.user.id;
    return this.ordersService.getAllOrders(userId);
  }
}
