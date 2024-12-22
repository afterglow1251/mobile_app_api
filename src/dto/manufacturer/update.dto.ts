import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateManufacturerDto {
  @ApiProperty({
    description: 'The name of the manufacturer',
    example: 'Toyota',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'The country where the manufacturer is located',
    example: 'Japan',
    required: false,
  })
  @IsString()
  @IsOptional()
  country?: string;
}
