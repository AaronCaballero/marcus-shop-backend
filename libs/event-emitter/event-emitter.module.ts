import { Global, Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductCustomizationEventHandler } from './handlers/product-event.handler';

@Global()
@Module({
  imports: [EventEmitterModule.forRoot()],
  providers: [ProductCustomizationEventHandler],
  exports: [EventEmitterModule],
})
export class EventsModule {}
