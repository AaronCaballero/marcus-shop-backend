import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAdapter } from '../adapter/product.adapter';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<ProductDto> {
    const product: Product = await this.repository.save(
      this.repository.create({
        ...createProductDto,
      }),
    );

    return this.getOne(product.id);
  }

  async getAll(): Promise<ProductDto[]> {
    return ProductAdapter.toDtos(await this.repository.find());
  }

  async getOne(id: string): Promise<ProductDto> {
    return ProductAdapter.toDto(
      await this.repository.findOneOrFail({
        where: {
          id,
        },
      }),
      true,
    );
  }

  // async getOneWithDetails(id: string): Promise<ProductDto> {
  //   const product: Product = await this.repository.findOneOrFail({
  //     where: {
  //       id,
  //     },
  //   });

  //   const customizationsIds = product.customizations
  //     ? product.customizations.map((customization) => customization.id)
  //     : undefined;

  //   const prohibitedCustomizations =
  //     customizationsIds &&
  //     this.prohibitedCustomizationService.getByCustomizationIds(
  //       customizationsIds,
  //     );

  //   return ProductAdapter.toDto(product, true);
  // }
}
