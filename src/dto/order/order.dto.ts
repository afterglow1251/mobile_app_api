import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  ValidateNested,
  Min,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemDto {
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
}

export class CreateOrderDto {
  @ApiProperty({
    description: 'The shipping address for the order',
    example: '123 Main St, Springfield, IL',
  })
  @IsNotEmpty()
  shippingAddress: string;

  @ApiProperty({
    description: 'The username of the customer placing the order',
    example: 'john_doe',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    description: 'The phone number of the customer',
    example: '+380960000000',
  })
  @IsNotEmpty()
  @IsPhoneNumber('UA', {
    message: 'The phone number must be a valid Ukrainian number',
  })
  phoneNumber: string;

  @ApiProperty({
    description: 'List of items in the order',
    type: [OrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  items: OrderItemDto[];
}
