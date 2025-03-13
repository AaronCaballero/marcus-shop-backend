import { ApiProperty } from '@nestjs/swagger';

export class CreateProhibitedCustomizationDto {
  @ApiProperty({ type: Array })
  ids: string[];

  constructor(ids: string) {
    Object.assign(this, { ids });
  }
}
