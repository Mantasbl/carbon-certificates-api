import { ApiProperty } from '@nestjs/swagger';

import { CarbonCertificate } from '../../../domain/models/carbon-certificate';
import { CertificateResource } from './certificate';

export class CarbonCertificateItemResource {
  @ApiProperty({ type: CertificateResource })
  readonly data: CertificateResource;

  constructor(data: CertificateResource) {
    this.data = data;
  }

  static from(certificate: CarbonCertificate): CarbonCertificateItemResource {
    return new CarbonCertificateItemResource(CertificateResource.from(certificate));
  }
}
