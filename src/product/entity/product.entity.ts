import { ApiProperty } from '@nestjs/swagger';
import { NumericTransformer, TimestampableEntity } from 'libs/database';
import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCategory, ProductStatus } from '../enum/product.enum';
import { ProductCustomization } from './product-customization.entity';

@Entity('products')
export class Product extends TimestampableEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty({ required: false })
  @Column({ nullable: true })
  description?: string;

  @ApiProperty()
  @Column({
    type: 'numeric',
    precision: 16,
    scale: 4,
    default: 0,
    transformer: new NumericTransformer(),
    nullable: true,
  })
  price?: number;

  @ApiProperty()
  @Index('index_product_category')
  @Column({
    type: 'enum',
    enum: ProductCategory,
    default: ProductCategory.Bicycles,
    nullable: true,
  })
  category?: ProductCategory;

  @ApiProperty()
  @Column({ type: 'enum', enum: ProductStatus, default: ProductStatus.Active })
  status: ProductStatus;

  @ApiProperty()
  @Column({
    type: 'numeric',
    precision: 16,
    scale: 4,
    default: 0,
    transformer: new NumericTransformer(),
    nullable: true,
  })
  stock: number;

  @ApiProperty()
  @Column({ type: Boolean, default: false })
  isCustomizable: boolean;

  @OneToMany(
    () => ProductCustomization,
    (productCustomization) => productCustomization.product,
    { cascade: true, lazy: true },
  )
  customizations?: ProductCustomization[];
}
