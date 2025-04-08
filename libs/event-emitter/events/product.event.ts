import { ProductCustomizationDto } from '../../../src/product/dto/product-customization.dto';
import { ProductCustomization } from '../../../src/product/entity/product-customization.entity';

export class ProductFetchedEvent {
  constructor(
    public readonly productId: string,
    public readonly customizations: ProductCustomization[],
  ) {}
}

export class CustomizationsByTypeProcessedEvent {
  constructor(
    public readonly productId: string,
    public readonly groupedCustomizations: {
      [key: string]: ProductCustomizationDto[];
    },
  ) {}
}
