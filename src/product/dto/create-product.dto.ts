import { ApiProperty } from '@nestjs/swagger';
import { ProductCategory, ProductStatus } from '../enum/product.enum';

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

  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, partial);
  }
}
