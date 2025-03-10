import { ProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';
import { ProductCustomizationAdapter } from './product-customization.adapter';

export class ProductAdapter {
  static async toDto(product: Product): Promise<ProductDto> {
    return new ProductDto({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      status: product.status,
      stock: product.stock,
      isCustomizable: product.isCustomizable,
      customizations: (await product.customizations)
        ? await ProductCustomizationAdapter.toDtos(
            await product.customizations!,
          )
        : undefined,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
      deletedAt: product.deletedAt,
    });
  }

  static toDtos(products: Product[]): Promise<ProductDto[]> {
    return Promise.all(
      products.map(async (product) => await this.toDto(product)),
    );
  }
}
