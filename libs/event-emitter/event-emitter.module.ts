import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductModule } from '../../src/product/product.module';
import { ProductCustomizationEventHandler } from './handlers/product-event.handler';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot(), ProductModule],
  providers: [ProductCustomizationEventHandler],
  exports: [EventEmitterModule],
})
export class EventsModule {}
