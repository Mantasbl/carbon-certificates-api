import { ApiProperty } from '@nestjs/swagger';

import { CarbonCertificate } from '../../../domain/models/carbon-certificate';
import { CertificateStatusType } from '../../../domain/types/carbon-certificate';
import { UserResource } from '../user/user';

export class CertificateResource {
  @ApiProperty({ type: String, example: 'England' })
  readonly country: string;

  @ApiProperty({ type: String, enum: CertificateStatusType, example: CertificateStatusType.AVAILABLE })
  readonly status: string;

  @ApiProperty({ type: UserResource, required: false })
  readonly owner?: UserResource;

  constructor(country: string, status: string, owner: UserResource | undefined) {
    this.country = country;
    this.status = status;
    this.owner = owner;
  }

  static from(certificate: CarbonCertificate): CertificateResource {
    return new CertificateResource(certificate.country, certificate.status, certificate.owner);
  }
}
