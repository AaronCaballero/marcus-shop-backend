import { ApiProperty } from '@nestjs/swagger';

export class TimestampableDto {
  @ApiProperty({
    type: Date,
    default: () => 'CURRENT_TIMESTAMP',
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    default: () => 'CURRENT_TIMESTAMP',
    required: false,
  })
  updatedAt: Date;

  @ApiProperty({ type: Date, default: null, required: false })
  deletedAt: Date;
}
