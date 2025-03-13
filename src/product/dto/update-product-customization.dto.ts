import { ApiProperty } from '@nestjs/swagger';
import { ProductCustomizationStatus, ProductCustomizationType } from '../enum/product-customization.enum';
import { ProductCategory } from '../enum/product.enum';

export class UpdateProductCustomizationDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ enum: ProductCategory })
  category?: ProductCategory;

  @ApiProperty({ enum: ProductCustomizationType })
  type?: ProductCustomizationType;

  @ApiProperty({ enum: ProductCustomizationStatus })
  status?: ProductCustomizationStatus;

  @ApiProperty({ type: Number })
  stock?: number;

  @ApiProperty({ type: Boolean })
  isRequired?: boolean;

  constructor(partial: Partial<UpdateProductCustomizationDto>) {
    Object.assign(this, partial);
  }
}
