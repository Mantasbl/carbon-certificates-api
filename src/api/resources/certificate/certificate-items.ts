import { ApiProperty } from '@nestjs/swagger';

import { CarbonCertificate } from '../../../domain/models/carbon-certificate';
import { CertificateResource } from './certificate';

export class CertificateItemsResource {
  @ApiProperty({ type: CertificateResource, isArray: true })
  readonly data: CertificateResource[];

  constructor(data: CertificateResource[]) {
    this.data = data;
  }

  static from(certificates: CarbonCertificate[]): CertificateItemsResource {
    return new CertificateItemsResource(
      certificates.map((certificate: CarbonCertificate) => CertificateResource.from(certificate)),
    );
  }
}
