import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { ProductCustomizationAdapter } from '../adapter/product-customization.adapter';
import { CreateProductCustomizationDto } from '../dto/create-product-customization.dto';
import { CreateProhibitedCustomizationDto } from '../dto/create-prohibited-customization.dto';
import { ProductCustomizationDto } from '../dto/product-customization.dto';
import { ProductCustomization } from '../entity/product-customization.entity';
import { ProductCategory } from '../enum/product.enum';

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

  async getAll(): Promise<ProductCustomizationDto[]> {
    return ProductCustomizationAdapter.toDtos(await this.repository.find());
  }

  async getAllByCategory(
    category: ProductCategory,
  ): Promise<ProductCustomizationDto[]> {
    return ProductCustomizationAdapter.toDtos(
      await this.repository.find({
        where: {
          category: category,
        },
      }),
    );
  }

  async getGroupedCustomizations(): Promise<
    { [key: string]: ProductCustomizationDto[] } | {}
  > {
    const customizations: ProductCustomization[] = await this.repository.find();

    return this.groupCustomizationsByType(customizations);
  }

  async getAllByIds(
    customizations: CreateProhibitedCustomizationDto,
  ): Promise<ProductCustomizationDto[]> {
    return ProductCustomizationAdapter.toDtos(
      await this.repository.findBy({ id: In(customizations.ids) }),
    );
  }

  async groupCustomizationsByType(
    customizations: ProductCustomization[],
  ): Promise<{ [key: string]: ProductCustomizationDto[] } | {}> {
    const customizationsByType = {};

    if (customizations && customizations?.length > 0) {
      for (const customization of customizations) {
        const type = customization.type!;

        if (!customizationsByType[type]) {
          customizationsByType[type] = [];
        }

        customizationsByType[type].push(
          await ProductCustomizationAdapter.toDto(customization),
        );
      }
    }

    return customizationsByType;
  }
}
