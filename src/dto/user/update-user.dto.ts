import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsOptional,
  IsPhoneNumber,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  username?: string;

  @ApiProperty({
    description: 'The phone number of the user',
    example: '+380960000000',
    required: false,
  })
  @IsPhoneNumber('UA', { message: 'Invalid phone number format' })
  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  phoneNumber?: string;

  @ApiProperty({
    description: 'The address of the user',
    example: '123 Main St, Springfield, IL',
    required: false,
  })
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value === '' ? null : value))
  address?: string;

  @ApiProperty({
    description: 'Indicates if the user is an employee',
    example: false,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isEmployee?: boolean;
}
