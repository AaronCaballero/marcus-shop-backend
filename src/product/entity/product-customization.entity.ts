import { ApiProperty } from '@nestjs/swagger';
import { NumericTransformer, TimestampableEntity } from 'libs/database';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCustomizationType } from '../enum/product-customization.enum';
import { Product } from './product.entity';
import { ProhibitedCustomization } from './prohibited-customization.entity';

@Entity('product_customizations')
export class ProductCustomization extends TimestampableEntity {
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
  @Column({
    type: 'enum',
    enum: ProductCustomizationType,
    default: ProductCustomizationType.AditionalFeature,
  })
  type?: ProductCustomizationType;

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
  isRequired: boolean;

  @ManyToOne(() => Product, (product) => product.customizations, {
    onDelete: 'CASCADE',
  })
  product: Product;

  @ManyToMany(
    () => ProhibitedCustomization,
    (prohibitedCustomization) => prohibitedCustomization.customizations,
    { lazy: true }
  )
  prohibitedCustomizations: ProhibitedCustomization[];
}
