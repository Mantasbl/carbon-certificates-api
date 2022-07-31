import { CarbonCertificate } from '../models/carbon-certificate';
import { User } from '../models/user';

export interface CarbonCertificateRepository {
  updateOneOwnership(params: CarbonCertificateUpdateParams): Promise<CarbonCertificate>;

  obtainOneByOwner(userId: number): Promise<CarbonCertificate>;

  obtainManyByOwner(userId: number): Promise<CarbonCertificate[]>;

  obtainManyOwnerless(): Promise<CarbonCertificate[]>;
}

export interface CarbonCertificateFilterParams {
  readonly id: number;

  readonly newOwner: string;

  readonly owner: number;
}

export interface CarbonCertificateUpdateParams {
  readonly id: number;

  readonly newOwner: User;

  readonly owner: number;
}
