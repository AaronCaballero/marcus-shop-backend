import { ApiProperty } from '@nestjs/swagger';
import { NumericTransformer, TimestampableEntity } from 'libs/database';
import {
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ProductCustomizationType } from '../enum/product-customization.enum';
import { ProductCategory } from '../enum/product.enum';
import { Product } from './product.entity';

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
  @Index('index_product_custmizations_category')
  @Column({
    type: 'enum',
    enum: ProductCategory,
    default: ProductCategory.Bicycles,
    nullable: true,
  })
  category?: ProductCategory;

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

  @ManyToMany(() => Product, (product) => product.customizations)
  @JoinTable({
    name: 'product_customizations_products',
    joinColumn: { name: 'customization_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'product_id', referencedColumnName: 'id' },
  })
  products: Product[];
}
