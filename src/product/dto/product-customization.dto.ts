import { ApiProperty } from '@nestjs/swagger';
import { TimestampableDto } from 'libs/database/dto/timestampable.dto';
import { Product } from '../entity/product.entity';
import { ProductCustomizationType } from '../enum/product-customization.enum';
import { ProductDto } from './product.dto';

export class ProductCustomizationDto extends TimestampableDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: String })
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ enum: ProductCustomizationType, required: false })
  type: ProductCustomizationType;

  @ApiProperty({ type: Number, default: 0 })
  stock: number;

  @ApiProperty({ type: Boolean, default: false })
  isRequired: boolean;

  @ApiProperty({ type: () => Product })
  product?: ProductDto;

  constructor(partial: Partial<ProductCustomizationDto>) {
    super();
    Object.assign(this, partial);
  }
}
