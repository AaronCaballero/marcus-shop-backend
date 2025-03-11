import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductCustomizationAdapter } from '../adapter/product-customization.adapter';
import { CreateProductCustomizationDto } from '../dto/create-product-customization.dto';
import { CreateProhibitedCustomizationDto } from '../dto/create-prohibited-customization.dto';
import { ProductCustomizationDto } from '../dto/product-customization.dto';
import { ProductCustomization } from '../entity/product-customization.entity';

@Injectable()
export class ProductCustomizationService {
  constructor(
    @InjectRepository(ProductCustomization)
    private readonly repository: Repository<ProductCustomization>,
  ) {}

  async create(
    createProductCustomizationDto: CreateProductCustomizationDto,
  ): Promise<ProductCustomizationDto> {
    const productCustomization: ProductCustomization =
      await this.repository.save(
        this.repository.create({
          ...createProductCustomizationDto,
        }),
      );

    return this.getOne(productCustomization.id);
  }

  async getOne(id: string): Promise<ProductCustomizationDto> {
    return ProductCustomizationAdapter.toDto(
      await this.repository.findOneOrFail({
        where: {
          id,
        },
      }),
    );
  }

  async getByIds(
    customizations: CreateProhibitedCustomizationDto,
  ): Promise<ProductCustomizationDto[]> {
    return ProductCustomizationAdapter.toDtos(
      await this.repository.findBy({ id: In(customizations.ids) }),
    );
  }
}
