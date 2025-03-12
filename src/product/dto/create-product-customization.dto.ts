import { ApiProperty } from '@nestjs/swagger';
import { ProductCustomizationType } from '../enum/product-customization.enum';
import { ProductCategory } from '../enum/product.enum';

export class CreateProductCustomizationDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ enum: ProductCategory, default: ProductCategory.Bicycles })
  category: ProductCategory;

  @ApiProperty({
    enum: ProductCustomizationType,
  })
  type: ProductCustomizationType;

  @ApiProperty({ type: Number, default: 0 })
  stock: number;

  @ApiProperty({ type: Boolean, default: false })
  isRequired: boolean;

  constructor(partial: Partial<CreateProductCustomizationDto>) {
    Object.assign(this, partial);
  }
}
