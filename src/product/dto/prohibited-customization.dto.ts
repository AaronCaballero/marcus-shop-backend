import { ApiProperty } from '@nestjs/swagger';
import { TimestampableDto } from 'libs/database/dto/timestampable.dto';
import { ProductCustomizationDto } from './product-customization.dto';

export class ProhibitedCustomizationDto extends TimestampableDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ isArray: true, type: () => ProductCustomizationDto })
  customizations?: ProductCustomizationDto[];

  @ApiProperty({ isArray: true, type: () => String })
  customizationIds?: string[];

  constructor(partial: Partial<ProhibitedCustomizationDto>) {
    super();
    Object.assign(this, partial);
  }
}
