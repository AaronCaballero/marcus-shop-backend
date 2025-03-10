import { ProductDto } from '../../dto/product.dto';
import { ProductCategory, ProductStatus } from '../../enum/product.enum';

export class ProductDtoBuilder {
  private productDto: ProductDto;

  constructor() {
    this.productDto = new ProductDto({
      id: '9f917bdd-3289-4f53-9de6-96065e7f4a89',
      name: 'Titan bicycle',
      description: 'Titan bicycle description',
      price: 999,
      category: ProductCategory.Bicycles,
      status: ProductStatus.Active,
      stock: 5,
      isCustomizable: false,
      createdAt: new Date('2008-10-31T00:00:00Z'),
      updatedAt: new Date('2008-10-31T00:00:00Z'),
    });
  }

  build(): ProductDto {
    return this.productDto;
  }
}
