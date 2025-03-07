import { ApiProperty } from '@nestjs/swagger';
import { TimestampableDto } from 'libs/database/dto/timestampable.dto';
import { ProductCategory, ProductStatus } from '../enum/product.enum';

export class ProductDto extends TimestampableDto {
  @ApiProperty({ type: String })
  productId: string;

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

  constructor(partial: Partial<ProductDto>) {
    super();
    Object.assign(this, partial);
  }
}
