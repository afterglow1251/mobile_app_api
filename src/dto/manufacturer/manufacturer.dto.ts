import { ApiProperty } from '@nestjs/swagger';

export class ManufacturerDto {
  @ApiProperty({
    description: 'The unique identifier of the manufacturer',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'The name of the manufacturer',
    example: 'Toyota',
  })
  name: string;

  @ApiProperty({
    description: 'The country where the manufacturer is located',
    example: 'Japan',
  })
  country: string;
}
