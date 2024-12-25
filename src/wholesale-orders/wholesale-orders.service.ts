import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WholesaleOrder } from 'src/entities/wholesale-order.entity';
import { WholesaleOrderItem } from 'src/entities/wholesale-order-item.entity';
import { Product } from 'src/entities/product.entity';
import { CreateWholesaleOrderDto } from 'src/dto/wholesale-order/wholesale-order.dto';
import { CustomHttpException } from 'src/errors/custom-http.exception';
import { WholesaleCustomer } from 'src/entities/wholesale-customer.entity';

@Injectable()
export class WholesaleOrdersService {
  constructor(
    @InjectRepository(WholesaleOrder)
    private readonly wholesaleOrdersRepository: Repository<WholesaleOrder>,
    @InjectRepository(WholesaleOrderItem)
    private readonly wholesaleOrderItemsRepository: Repository<WholesaleOrderItem>,
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(WholesaleCustomer)
    private readonly wholesaleCustomersRepository: Repository<WholesaleCustomer>,
  ) {}

  async createWholesaleOrder(
    createWholesaleOrderDto: CreateWholesaleOrderDto,
  ): Promise<WholesaleOrder> {
    const { items, customerId } = createWholesaleOrderDto;

    const customer = await this.wholesaleCustomersRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new CustomHttpException(
        `Wholesale customer with ID ${customerId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const productsMap = new Map<number, Product>();
    for (const item of items) {
      const product = await this.productsRepository.findOne({
        where: { id: item.productId },
      });

      if (!product) {
        throw new CustomHttpException(
          `Product with ID ${item.productId} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      if (product.quantity < item.quantity) {
        throw new CustomHttpException(
          `Insufficient quantity for product ${product.name}.`,
          HttpStatus.BAD_REQUEST,
          {
            productId: product.id,
            productName: product.name,
            availableQuantity: product.quantity,
            requestedQuantity: item.quantity,
          },
        );
      }

      const finalPrice =
        item.wholesalePrice !== undefined ? item.wholesalePrice : product.price;

      productsMap.set(item.productId, { ...product, price: finalPrice });
    }

    const totalPrice = items.reduce((sum, item) => {
      const product = productsMap.get(item.productId);
      const finalPrice =
        item.wholesalePrice !== undefined ? item.wholesalePrice : product.price;
      return sum + finalPrice * item.quantity;
    }, 0);

    const wholesaleOrder = this.wholesaleOrdersRepository.create({
      customer,
      totalPrice,
      status: 'pending',
    });

    const savedOrder =
      await this.wholesaleOrdersRepository.save(wholesaleOrder);

    const wholesaleOrderItems = items.map((item) =>
      this.wholesaleOrderItemsRepository.create({
        order: savedOrder,
        product: productsMap.get(item.productId),
        quantity: item.quantity,
        price: productsMap.get(item.productId).price,
      }),
    );

    await this.wholesaleOrderItemsRepository.save(wholesaleOrderItems);

    for (const item of items) {
      const product = productsMap.get(item.productId);
      product.quantity -= item.quantity;
      await this.productsRepository.save(product);
    }

    return savedOrder;
  }

  async getAllWholesaleOrders(): Promise<WholesaleOrder[]> {
    const orders = await this.wholesaleOrdersRepository.find({
      relations: ['customer', 'orderItems.product'],
      order: { createdAt: 'DESC' },
    });

    return orders;
  }

  async getWholesaleOrderById(id: number) {
    const order = await this.wholesaleOrdersRepository.findOne({
      where: { id },
      relations: ['orderItems.product'],
    });
    if (!order) {
      throw new CustomHttpException('Order not found', HttpStatus.NOT_FOUND);
    }
    return order;
  }

  async getLatestOrdersByCustomer(
    customerId: number,
  ): Promise<WholesaleOrder[]> {
    const customer = await this.wholesaleCustomersRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new CustomHttpException(
        `Customer with ID ${customerId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const orders = await this.wholesaleOrdersRepository.find({
      where: { customer: { id: customerId } },
      relations: ['orderItems.product'],
      order: { createdAt: 'DESC' },
      take: 3,
    });

    return orders;
  }

  async getAllOrdersByCustomer(customerId: number): Promise<WholesaleOrder[]> {
    const customer = await this.wholesaleCustomersRepository.findOne({
      where: { id: customerId },
    });
    if (!customer) {
      throw new CustomHttpException(
        `Customer with ID ${customerId} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    const orders = await this.wholesaleOrdersRepository.find({
      where: { customer: { id: customerId } },
      relations: ['orderItems.product'],
      order: { createdAt: 'DESC' },
    });

    return orders;
  }

  async deleteWholesaleOrder(id: number): Promise<void> {
    const order = await this.wholesaleOrdersRepository.findOne({
      where: { id },
    });

    if (!order) {
      throw new CustomHttpException('Order not found', HttpStatus.NOT_FOUND);
    }

    await this.wholesaleOrdersRepository.remove(order);
  }
}
