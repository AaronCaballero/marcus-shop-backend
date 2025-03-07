import { ProductDto } from '../dto/product.dto';
import { Product } from '../entity/product.entity';

export class ProductAdapter {
  static async toDto(product: Product): Promise<ProductDto> {
    return new ProductDto({
      productId: product.productId,
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      status: product.status,
      stock: product.stock,
      isCustomizable: product.isCustomizable,
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
