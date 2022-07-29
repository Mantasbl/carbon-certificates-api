import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CertificateUpdateBody {
  @ApiProperty({ type: String, required: true, example: 'TestUser' })
  @IsString()
  readonly newOwner: string;

  constructor(newOwner: string) {
    this.newOwner = newOwner;
  }
}
