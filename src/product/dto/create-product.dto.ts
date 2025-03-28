import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ProductCategory, ProductStatus } from '../enum/product.enum';
import { ProductCustomizationDto } from './product-customization.dto';

export class CreateProductDto {
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsNumber()
  @Min(0, { message: 'The minimum product price is 0' })
  @IsOptional()
  @ApiProperty({ required: false })
  price?: number;

  @IsEnum(ProductCategory)
  @IsOptional()
  @ApiProperty({ enum: ProductCategory, required: false })
  category?: ProductCategory;

  @IsEnum(ProductStatus)
  @ApiProperty({ enum: ProductStatus, default: ProductStatus.Active })
  status: ProductStatus;

  @IsNumber()
  @Min(0, { message: 'The minimum stock is 0' })
  @ApiProperty({ type: Number, default: 0 })
  stock: number;

  @ApiProperty({ type: Boolean, default: false })
  isCustomizable: boolean;

  @IsOptional()
  @ApiProperty({ isArray: true, type: () => ProductCustomizationDto })
  customizations?: ProductCustomizationDto[];

  constructor(partial: Partial<CreateProductDto>) {
    Object.assign(this, partial);
  }
}
