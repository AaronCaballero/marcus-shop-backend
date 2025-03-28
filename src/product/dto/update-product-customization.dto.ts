import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import {
  ProductCustomizationStatus,
  ProductCustomizationType,
} from '../enum/product-customization.enum';
import { ProductCategory } from '../enum/product.enum';

export class UpdateProductCustomizationDto {
  @ApiProperty({ type: String })
  id: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ type: String })
  name?: string;

  @IsString()
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
  @ApiProperty({ enum: ProductCategory })
  category?: ProductCategory;

  @IsEnum(ProductCustomizationType)
  @IsOptional()
  @ApiProperty({ enum: ProductCustomizationType })
  type?: ProductCustomizationType;

  @IsEnum(ProductCustomizationStatus)
  @IsOptional()
  @ApiProperty({ enum: ProductCustomizationStatus })
  status?: ProductCustomizationStatus;

  @IsNumber()
  @Min(0, { message: 'The minimum stock is 0' })
  @IsOptional()
  @ApiProperty({ type: Number })
  stock?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ type: Boolean })
  isRequired?: boolean;

  constructor(partial: Partial<UpdateProductCustomizationDto>) {
    Object.assign(this, partial);
  }
}
