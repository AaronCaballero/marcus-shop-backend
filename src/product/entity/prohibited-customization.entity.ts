import { ApiProperty } from '@nestjs/swagger';
import { TimestampableEntity } from 'libs/database';
import { Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCustomization } from './product-customization.entity';

@Entity('prohibited_customizations')
export class ProhibitedCustomization extends TimestampableEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => ProductCustomization)
  @JoinTable({
    name: 'prohibited_customizations_combinations',
    joinColumn: {
      name: 'prohibited_customization_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: { name: 'customization_id', referencedColumnName: 'id' },
  })
  customizations: ProductCustomization[];
}
