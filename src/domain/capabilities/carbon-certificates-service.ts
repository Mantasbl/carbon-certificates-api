import { CarbonCertificate } from '../models/carbon-certificate';
import { CarbonCertificateFilterParams } from './carbon-certificates-repository';

export interface CarbonCertificateService {
  updateOneOwnership(params: CarbonCertificateFilterParams): Promise<CarbonCertificate>;

  obtainManyByOwner(userId: number): Promise<CarbonCertificate[]>;

  obtainManyOwnerless(): Promise<CarbonCertificate[]>;
}
