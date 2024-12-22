import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from 'src/entities/order.entity';
import { Product } from 'src/entities/product.entity';
import { OrderItem } from 'src/entities/order-item.entity';
import { CreateOrderDto } from './../dto/order/order.dto';
import { CustomHttpException } from 'src/errors/custom-http.exception';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly ordersRepository: Repository<Order>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto, userId: number) {
    const { shippingAddress, items, username, phoneNumber } = createOrderDto;

    const productsMap = new Map<number, Product>();
    for (const item of items) {
      const product =
        productsMap.get(item.productId) ||
        (await this.productsRepository.findOne({
          where: { id: item.productId },
        }));
      if (!product) {
        throw new CustomHttpException(
          `Product with ID ${item.productId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      if (product.quantity < item.quantity) {
        throw new CustomHttpException(
          `Insufficient quantity for product ${product.name}. Available: ${product.quantity}, Requested: ${item.quantity}`,
          HttpStatus.BAD_REQUEST,
        );
      }
      productsMap.set(item.productId, product);
    }

    const order = this.ordersRepository.create({
      user: { id: userId },
      shippingAddress,
      username,
      phoneNumber,
      totalPrice: items.reduce(
        (sum, item) =>
          sum + productsMap.get(item.productId).price * item.quantity,
        0,
      ),
      status: 'pending',
    });

    const savedOrder = await this.ordersRepository.save(order);

    const orderItems = items.map((item) =>
      this.orderItemsRepository.create({
        order: savedOrder,
        product: productsMap.get(item.productId),
        quantity: item.quantity,
        price: productsMap.get(item.productId).price,
      }),
    );

    await this.orderItemsRepository.save(orderItems);

    for (const item of items) {
      const product = productsMap.get(item.productId);
      product.quantity -= item.quantity;
      await this.productsRepository.save(product);
    }

    return savedOrder;
  }

  async getAllOrders(userId: number) {
    const orders = await this.ordersRepository.find({
      where: { user: { id: userId } },
      relations: [
        'orderItems',
        'orderItems.product',
        'orderItems.product.images',
      ],
      order: { createdAt: 'DESC' },
    });

    return orders.map((order) => ({
      ...order,
      createdAt: order.createdAt,
    }));
  }
}
