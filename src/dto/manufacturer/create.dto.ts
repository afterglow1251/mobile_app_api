import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManufacturerDto {
  @ApiProperty({
    description: 'The name of the manufacturer',
    example: 'Toyota',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The country of the manufacturer',
    example: 'Japan',
  })
  @IsString()
  country: string;
}
