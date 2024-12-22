import { IsString } from 'class-validator';

export class CreateManufacturerDto {
  @IsString()
  name: string;

  @IsString()
  country: string;
}
