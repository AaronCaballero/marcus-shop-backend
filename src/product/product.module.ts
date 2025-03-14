import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCustomization } from './entity/product-customization.entity';
import { Product } from './entity/product.entity';
import { ProhibitedCustomization } from './entity/prohibited-customization.entity';
import { ProductController } from './product.controller';
import { ProductCustomizationService } from './service/product-customization.service';
import { ProductService } from './service/product.service';
import { ProhibitedCustomizationService } from './service/prohibited-customization.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      ProductCustomization,
      ProhibitedCustomization,
    ]),
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductCustomizationService,
    ProhibitedCustomizationService,
  ],
  exports: [
    ProductService,
    ProductCustomizationService,
    ProhibitedCustomizationService,
  ],
})
export class ProductModule {}
