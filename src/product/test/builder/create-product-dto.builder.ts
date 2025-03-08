import { CreateProductDto } from '../../dto/create-product.dto';
import { ProductCategory, ProductStatus } from '../../enum/product.enum';


export class CreateProductDtoBuilder {
  private createProductDto: CreateProductDto;

  constructor() {
    this.createProductDto = new CreateProductDto({
      name: 'Titan bicycle',
      description: 'Titan bicycle description',
      price: 999,
      category: ProductCategory.Bicycles,
      status: ProductStatus.Active,
      stock: 5,
      isCustomizable: false,
    });
  }

  build(): CreateProductDto {
    return this.createProductDto;
  }
}
