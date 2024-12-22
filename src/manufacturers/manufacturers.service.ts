import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manufacturer } from 'src/entities/manufacturers.entity';
import { CreateManufacturerDto } from 'src/dto/manufacturer/create.dto';
import { UpdateManufacturerDto } from 'src/dto/manufacturer/update.dto';
import { CustomHttpException } from 'src/errors/custom-http.exception';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturersRepository: Repository<Manufacturer>,
  ) {}

  async create(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    const manufacturer = this.manufacturersRepository.create(
      createManufacturerDto,
    );
    return this.manufacturersRepository.save(manufacturer);
  }

  async findAll(): Promise<Manufacturer[]> {
    return this.manufacturersRepository.find();
  }

  async findOne(id: number): Promise<Manufacturer> {
    const manufacturer = await this.manufacturersRepository.findOne({
      where: { id },
    });
    if (!manufacturer) {
      throw new CustomHttpException('Manufacturer not found', 404);
    }
    return manufacturer;
  }

  async update(
    id: number,
    updateManufacturerDto: UpdateManufacturerDto,
  ): Promise<Manufacturer> {
    const manufacturer = await this.manufacturersRepository.findOne({
      where: { id },
    });
    if (!manufacturer) {
      throw new CustomHttpException('Manufacturer not found', 404);
    }
    return this.manufacturersRepository.save({
      ...manufacturer,
      ...updateManufacturerDto,
    });
  }

  async remove(id: number): Promise<void> {
    const manufacturer = await this.manufacturersRepository.findOne({
      where: { id },
    });
    if (!manufacturer) {
      throw new CustomHttpException('Manufacturer not found', 404);
    }
    await this.manufacturersRepository.delete(id);
  }
}
