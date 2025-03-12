import { Injectable, NotFoundException } from '@nestjs/common';
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

  async delete(id: string): Promise<boolean> {
    try {
      await this.repository.findOneOrFail({ where: { id } });

      await this.repository.manager.transaction(async (manager) => {
        await manager
          .createQueryBuilder()
          .delete()
          .from('product_customizations_products')
          .where('product_id = :id', { id: id })
          .execute();

        await manager
          .createQueryBuilder()
          .delete()
          .from('product_prohibited_customizations')
          .where('product_id = :id', { id: id })
          .execute();

        await manager.delete(Product, id);
      });

      return true;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // Function to validate product prohibited customizations before creating an order
  async areValidProductCustomizations(
    productId: string,
    customizationIds: string[],
  ): Promise<boolean> {
    const result = await this.repository.query(
      `
      SELECT pcc.prohibited_customization_id
      FROM product_prohibited_customizations pcp
      JOIN prohibited_customizations_combinations pcc 
      ON pcp.prohibited_customization_id = pcc.prohibited_customization_id
      WHERE pcp.product_id = $1
      AND pcc.customization_id = ANY($2)
      GROUP BY pcc.prohibited_customization_id
      HAVING COUNT(DISTINCT pcc.customization_id) > 1;
      `,
      [productId, customizationIds],
    );

    return result.map((row) => row.prohibited_customization_id).length === 0;
  }
}
