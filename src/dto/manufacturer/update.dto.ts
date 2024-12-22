import { IsString, IsOptional } from 'class-validator';

export class UpdateManufacturerDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  country?: string;
}
