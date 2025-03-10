import { ProductCustomizationDto } from '../dto/product-customization.dto';
import { ProductCustomization } from '../entity/product-customization.entity';
import { ProductAdapter } from './product.adapter';

export class ProductCustomizationAdapter {
  static async toDto(
    customization: ProductCustomization,
    includeProduct: boolean = false,
  ): Promise<ProductCustomizationDto> {
    return new ProductCustomizationDto({
      id: customization.id,
      name: customization.name,
      description: customization.description,
      price: customization.price,
      type: customization.type,
      stock: customization.stock,
      isRequired: customization.isRequired,
      product:
        includeProduct && (await customization.product)
          ? await ProductAdapter.toDto(await customization.product)
          : undefined,
      createdAt: customization.createdAt,
      updatedAt: customization.updatedAt,
      deletedAt: customization.deletedAt,
    });
  }

  static toDtos(
    products: ProductCustomization[],
    includeProduct: boolean = false,
  ): Promise<ProductCustomizationDto[]> {
    return Promise.all(
      products.map(
        async (product) => await this.toDto(product, includeProduct),
      ),
    );
  }
}
