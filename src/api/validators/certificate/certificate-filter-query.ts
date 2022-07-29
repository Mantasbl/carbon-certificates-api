import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CertificateFilterQuery {
  @ApiProperty({ type: String, required: true, example: 1233451 })
  @IsString()
  readonly userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }
}
