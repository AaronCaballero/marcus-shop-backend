import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import {
  CustomizationsByTypeProcessedEvent,
  ProductFetchedEvent,
} from 'libs/event-emitter/events/product.event';
import { Repository } from 'typeorm';
import { ProductAdapter } from '../adapter/product.adapter';
import { CreateProductDto } from '../dto/create-product.dto';
import { ProductDto } from '../dto/product.dto';
import { ProductCustomization } from '../entity/product-customization.entity';
import { Product } from '../entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
    private readonly eventEmitter: EventEmitter2,
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

    const customizations: ProductCustomization[] | undefined =
      await product.customizations;

    const groupedCustomizations = customizations
      ? await this.getGroupedCustomizations(id, customizations ?? [])
      : [];

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
          .where('product_id = :id', { id })
          .execute();

        await manager
          .createQueryBuilder()
          .delete()
          .from('product_prohibited_customizations')
          .where('product_id = :id', { id })
          .execute();

        await manager.delete(Product, id);
      });

      return true;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  private async getGroupedCustomizations(
    productId: string,
    customizations: ProductCustomization[],
  ): Promise<any> {
    return new Promise<any>((resolve) => {
      const listener = (event: CustomizationsByTypeProcessedEvent) => {
        if (event.productId === productId) {
          this.eventEmitter.removeListener(
            'customizations.processed',
            listener,
          );
          resolve(event.groupedCustomizations);
        }
      };

      this.eventEmitter.on('customizations.processed', listener);

      this.eventEmitter.emit(
        'product.fetched',
        new ProductFetchedEvent(productId, customizations ?? []),
      );

      setTimeout(() => {
        this.eventEmitter.removeListener('customizations.processed', listener);
        resolve(undefined);
      }, 5000);
    });
  }

  //TODO: Function to validate stock

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
