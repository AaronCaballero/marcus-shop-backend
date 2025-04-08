import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { CustomizationsByTypeProcessedEvent, ProductFetchedEvent } from '../events/product.event';
import { ProductCustomizationService } from '../../../src/product/service/product-customization.service';

@Injectable()
export class ProductCustomizationEventHandler {
  constructor(
    private readonly customizationService: ProductCustomizationService,
    private readonly eventEmitter: EventEmitter2
  ) {}

  @OnEvent('product.fetched')
  async handleProductFetched(event: ProductFetchedEvent) {
    const groupedCustomizations = 
      await this.customizationService.groupCustomizationsByType(
        event.customizations ?? []
      );
    
    // Emitir evento con las customizaciones procesadas
    this.eventEmitter.emit(
      'customizations.processed',
      new CustomizationsByTypeProcessedEvent(
        event.productId,
        groupedCustomizations
      )
    );
  }
}