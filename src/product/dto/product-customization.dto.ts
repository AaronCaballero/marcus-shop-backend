import { ApiProperty } from '@nestjs/swagger';
import { TimestampableDto } from 'libs/database/dto/timestampable.dto';
import {
  ProductCustomizationStatus,
  ProductCustomizationType,
} from '../enum/product-customization.enum';
import { ProductCategory } from '../enum/product.enum';

export class ProductCustomizationDto extends TimestampableDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ enum: ProductCategory })
  category: ProductCategory;

  @ApiProperty({ enum: ProductCustomizationType })
  type: ProductCustomizationType;

  @ApiProperty({ enum: ProductCustomizationStatus })
  status: ProductCustomizationStatus;

  @ApiProperty({ type: Number, default: 0 })
  stock: number;

  @ApiProperty({ type: Boolean, default: false })
  isRequired: boolean;

  constructor(partial: Partial<ProductCustomizationDto>) {
    super();
    Object.assign(this, partial);
  }
}
