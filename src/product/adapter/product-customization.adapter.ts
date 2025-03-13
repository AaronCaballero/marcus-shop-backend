import { ProductCustomizationDto } from '../dto/product-customization.dto';
import { ProductCustomization } from '../entity/product-customization.entity';

export class ProductCustomizationAdapter {
  static async toDto(
    customization: ProductCustomization,
  ): Promise<ProductCustomizationDto> {
    return new ProductCustomizationDto({
      id: customization.id,
      name: customization.name,
      description: customization.description,
      price: customization.price,
      type: customization.type,
      status: customization.status,
      stock: customization.stock,
      isRequired: customization.isRequired,
      createdAt: customization.createdAt,
      updatedAt: customization.updatedAt,
      deletedAt: customization.deletedAt,
    });
  }

  static toDtos(
    products: ProductCustomization[],
  ): Promise<ProductCustomizationDto[]> {
    return Promise.all(
      products.map(async (product) => await this.toDto(product)),
    );
  }
}
