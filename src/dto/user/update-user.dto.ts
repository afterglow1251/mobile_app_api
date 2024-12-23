import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+380960000000',
    required: false,
  })
  @IsPhoneNumber('UA', { message: 'Invalid phone number format' })
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main St, Springfield, IL',
    required: false,
  })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiProperty({
    description: 'Whether the user is an employee',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isEmployee?: boolean;
}
