import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory, ProductStatus } from '../enum/product.enum';
import { ProductCustomizationDto } from './product-customization.dto';

export class CreateProductDto {
  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ enum: ProductCategory, required: false })
  category?: ProductCategory;

  @ApiProperty({ enum: ProductStatus, default: ProductStatus.Active })
  status: ProductStatus;

  @ApiProperty({ type: Number, default: 0 })
  stock: number;

  @ApiProperty({ type: Boolean, default: false })
  isCustomizable: boolean;

  @ApiProperty({ isArray: true, type: () => ProductCustomizationDto })
  customizations?: ProductCustomizationDto[];

  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, partial);
  }
}
