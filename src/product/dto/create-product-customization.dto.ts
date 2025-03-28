import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';
import {
  ProductCustomizationStatus,
  ProductCustomizationType,
} from '../enum/product-customization.enum';
import { ProductCategory } from '../enum/product.enum';

export class CreateProductCustomizationDto {
  @IsString()
  @ApiProperty({ type: String })
  name: string;

  @IsString()
  @ApiProperty({ required: false })
  description?: string;

  @IsNumber()
  @Min(0, { message: 'The minimum product price is 0' })
  @IsOptional()
  @ApiProperty({ required: false })
  price?: number;

  @IsEnum(ProductCategory)
  @IsOptional()
  @ApiProperty({ enum: ProductCategory, default: ProductCategory.Bicycles })
  category?: ProductCategory;

  @IsEnum(ProductCustomizationType)
  @ApiProperty({
    enum: ProductCustomizationType,
  })
  type: ProductCustomizationType;

  @IsEnum(ProductCustomizationStatus)
  @IsOptional()
  @ApiProperty({
    enum: ProductCustomizationStatus,
    default: ProductCustomizationStatus.Active,
  })
  status?: ProductCustomizationStatus;

  @IsNumber()
  @Min(0, { message: 'The minimum stock is 0' })
  @IsOptional()
  @ApiProperty({ type: Number, default: 0 })
  stock?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean, default: false })
  isRequired: boolean;

  constructor(partial: Partial<CreateProductCustomizationDto>) {
    Object.assign(this, partial);
  }
}
