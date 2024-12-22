import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateWholesaleCustomerDto {
  @ApiProperty({ description: 'Name of the wholesale customer' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Address of the wholesale customer' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Phone number of the wholesale customer' })
  @IsPhoneNumber('UA')
  phoneNumber: string;
}
