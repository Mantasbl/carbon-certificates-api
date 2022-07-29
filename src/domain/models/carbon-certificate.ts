import { CertificateStatusType } from './../types/carbon-certificate';
import { User } from './user';

export interface CarbonCertificate {
  readonly id: number;

  readonly country: string;

  readonly status: CertificateStatusType;

  readonly owner?: User;
}
