import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductAdapter } from '../adapter/product.adapter';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';
import { ProductCustomizationService } from './product-customization.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly customizationService: ProductCustomizationService,
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
    const product: Product = await this.repository.findOneOrFail({
      where: {
        id,
      },
      relations: ['customizations'],
    });

    const groupedCustomizations =
      await this.customizationService.groupCustomizationsByType(
        (await product.customizations) ?? [],
      );

    return ProductAdapter.toDto(product, true, groupedCustomizations);
  }
}
