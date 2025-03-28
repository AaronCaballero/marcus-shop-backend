import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class CreateProhibitedCustomizationDto {
  @IsArray()
  @ApiProperty({ type: Array })
  ids: string[];

  constructor(ids: string) {
    Object.assign(this, { ids });
  }
}
