import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CertificateIdParam {
  @ApiProperty({ type: String, example: '123456' })
  @IsString()
  readonly certificateId: string;

  constructor(certificateId: string) {
    this.certificateId = certificateId;
  }
}
