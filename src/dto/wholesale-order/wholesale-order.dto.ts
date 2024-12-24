import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
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
    description:
      'Optional price of the product being ordered. If not provided, the default product price will be used.',
    example: 25.5,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  wholesalePrice?: number;
}

export class CreateWholesaleOrderDto {
  @ApiProperty({
    description: 'The ID of the wholesale customer placing the order',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  customerId: number;

  @ApiProperty({
    description: 'The list of items in the wholesale order',
    type: [WholesaleOrderItemDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => WholesaleOrderItemDto)
  items: WholesaleOrderItemDto[];
}
