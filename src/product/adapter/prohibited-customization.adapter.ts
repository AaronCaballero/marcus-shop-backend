import { ProhibitedCustomizationDto } from '../dto/prohibited-customization.dto';
import { ProhibitedCustomization } from '../entity/prohibited-customization.entity';
import { ProductCustomizationAdapter } from './product-customization.adapter';

export class ProhibitedCustomizationAdapter {
  static async toDto(
    prohibited: ProhibitedCustomization,
    includeCustomizations: boolean = false,
  ): Promise<ProhibitedCustomizationDto> {
    return new ProhibitedCustomizationDto({
      id: prohibited.id,
      customizations:
        includeCustomizations && (await prohibited.customizations)
          ? await ProductCustomizationAdapter.toDtos(
              await prohibited.customizations!,
            )
          : [],
      customizationIds:
        includeCustomizations && (await prohibited.customizations)
          ? prohibited.customizations.map((customization) => customization.id)
          : [],
      createdAt: prohibited.createdAt,
      updatedAt: prohibited.updatedAt,
      deletedAt: prohibited.deletedAt,
    });
  }

  static toDtos(
    customizations: ProhibitedCustomization[],
    includeCustomizations: boolean = false,
  ): Promise<ProhibitedCustomizationDto[]> {
    return Promise.all(
      customizations.map(
        async (prohibited) =>
          await this.toDto(prohibited, includeCustomizations),
      ),
    );
  }
}
