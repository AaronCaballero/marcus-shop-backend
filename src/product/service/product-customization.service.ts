import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCustomizationAdapter } from '../adapter/product-customization.adapter';
import { CreateProductCustomizationDto } from '../dto/create-product-customization.dto';
import { ProductCustomizationDto } from '../dto/product-customization.dto';
import { ProductCustomization } from '../entity/product-customization.entity';
import { ProductService } from './product.service';

@Injectable()
export class ProductCustomizationService {
  constructor(
    @InjectRepository(ProductCustomization)
    private readonly repository: Repository<ProductCustomization>,
    private readonly productService: ProductService,
  ) {}

  async create(
    productId: string,
    createProductCustomizationDto: CreateProductCustomizationDto,
  ): Promise<ProductCustomizationDto> {
    const product = await this.productService.getOne(productId);

    const productCustomization: ProductCustomization =
      await this.repository.save(
        this.repository.create({
          ...createProductCustomizationDto,
          product,
        }),
      );

    return this.getOne(productCustomization.id);
  }

  async getAll(): Promise<ProductCustomizationDto[]> {
    return ProductCustomizationAdapter.toDtos(await this.repository.find());
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
}
