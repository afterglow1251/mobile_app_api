import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsPhoneNumber } from 'class-validator';

export class UpdateWholesaleCustomerDto {
  @ApiProperty({
    description: 'Name of the wholesale customer',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Address of the wholesale customer',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Phone number of the wholesale customer',
    required: false,
  })
  @IsPhoneNumber('UA')
  @IsOptional()
  phoneNumber?: string;
}
