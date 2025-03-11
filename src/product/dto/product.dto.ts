import { ApiProperty } from '@nestjs/swagger';
import { TimestampableDto } from 'libs/database/dto/timestampable.dto';
import { ProductCategory, ProductStatus } from '../enum/product.enum';
import { ProductCustomizationDto } from './product-customization.dto';

export class ProductDto extends TimestampableDto {
  @ApiProperty({ type: String })
  id: string;

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

  @ApiProperty()
  groupedCustomizations?: { [key: string]: ProductCustomizationDto[] } | {};

  constructor(partial: Partial<ProductDto>) {
    super();
    Object.assign(this, partial);
  }
}
