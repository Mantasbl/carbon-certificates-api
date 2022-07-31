import {
  CarbonCertificateFilterParams,
  CarbonCertificateRepository,
} from '../capabilities/carbon-certificates-repository';
import { CarbonCertificateService } from '../capabilities/carbon-certificates-service';
import { UserRepository } from '../capabilities/user-repository';
import { CarbonCertificate } from '../models/carbon-certificate';

export class CarbonCertificateServiceImpl implements CarbonCertificateService {
  constructor(private certificates: CarbonCertificateRepository, private users: UserRepository) {}

  async updateOneOwnership(params: CarbonCertificateFilterParams): Promise<CarbonCertificate> {
    const user = await this.users.obtainUserByUsername(params.newOwner);
    return await this.certificates.updateOneOwnership({ id: params.id, newOwner: user });
  }

  async obtainManyByOwner(userId: number): Promise<CarbonCertificate[]> {
    return await this.certificates.obtainManyByOwner(userId);
  }

  async obtainManyOwnerless(): Promise<CarbonCertificate[]> {
    return await this.certificates.obtainManyOwnerless();
  }
}
