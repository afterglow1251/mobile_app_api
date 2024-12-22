import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';

export class WholesaleOrderItemDto {
  @ApiProperty({
    description: 'The ID of the product being ordered',
    example: 123,
  })
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @ApiProperty({
    description: 'The quantity of the product ordered',
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  quantity: number;

  @ApiProperty({
    description: 'The price of the product in the order',
    example: 500.99,
  })
  @IsNotEmpty()
  @IsNumber()
  price: number;
}

export class CreateWholesaleOrderDto {
  @ApiProperty({
    description: 'The total price of the order',
    example: 1000.99,
  })
  @IsNotEmpty()
  totalPrice: number;

  @ApiProperty({
    description: 'The ID of the wholesale customer placing the order',
    example: 1,
  })
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    description: 'Order status (pending, shipped, delivered, cancelled)',
    example: 'pending',
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
  })
  @IsEnum(['pending', 'shipped', 'delivered', 'cancelled'])
  status: string;

  @ApiProperty({
    description: 'The list of items in the wholesale order',
    type: [WholesaleOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WholesaleOrderItemDto)
  items: WholesaleOrderItemDto[];

  @ApiProperty({
    description: 'Shipping address for the wholesale order',
    example: '123 Main St, Springfield, IL',
  })
  @IsNotEmpty()
  @IsString()
  shippingAddress: string;
}
