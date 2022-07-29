import { EntityRepository, Repository } from 'typeorm';

import {
  CarbonCertificateRepository,
  CarbonCertificateUpdateParams,
} from '../../../domain/capabilities/carbon-certificates-repository';
import { CertificateNotFoundError } from '../../../domain/exceptions/certificate-not-found';
import { CarbonCertificate } from '../../../domain/models/carbon-certificate';
import * as carbonCertificate from '../../../domain/types/carbon-certificate';
import { CarbonCertificate as CarbonCertificateEntity } from '../entity/carbon-certificate';
@EntityRepository(CarbonCertificateEntity)
export class CarbonCertificateEntityManager
  extends Repository<CarbonCertificateEntity>
  implements CarbonCertificateRepository
{
  async obtainManyByOwner(userId: number): Promise<CarbonCertificate[]> {
    const certificateQuery = this.createQueryBuilder('carbon_certificate')
      .leftJoin('carbon_certificate.owner', 'owner')
      .select('owner.username', 'owner_username')
      .addSelect('carbon_certificate.status', 'carbon_certificate_status')
      .addSelect('carbon_certificate.country', 'carbon_certificate_country')
      .addSelect('carbon_certificate.id', 'carbon_certificate_id')
      .where('owner.id = :userId')
      .setParameters({ userId });
    const findResult = await certificateQuery.getMany();
    return findResult as CarbonCertificate[];
  }

  async obtainManyOwnerless(): Promise<CarbonCertificate[]> {
    const certificateQuery = this.createQueryBuilder('carbon_certificate')
      .leftJoin('carbon_certificate.owner', 'owner')
      .select('owner.username', 'owner_username')
      .addSelect('carbon_certificate.status', 'carbon_certificate_status')
      .addSelect('carbon_certificate.country', 'carbon_certificate_country')
      .addSelect('carbon_certificate.id', 'carbon_certificate_id')
      .where('owner IS NULL');
    const findResult = await certificateQuery.getMany();
    return findResult as CarbonCertificate[];
  }

  async obtainOneByOwner(id: number): Promise<CarbonCertificate> {
    const certificateQuery = this.createQueryBuilder('carbon_certificate')
      .leftJoin('carbon_certificate.owner', 'owner')
      .where('carbon_certificate.id = :id')
      .setParameters({ id });

    const findResult = await certificateQuery.getOne();
    return findResult as CarbonCertificate;
  }

  async updateOneOwnership(params: CarbonCertificateUpdateParams): Promise<CarbonCertificate> {
    const findResult = await this.obtainOneByOwner(params.id);

    if (!findResult) {
      throw new CertificateNotFoundError();
    }
    const saveResult = await this.save({
      ...findResult,
      owner: params.newOwner,
      status: carbonCertificate.CertificateStatusType.TRANSFERED,
    });
    const updatedResult = await this.obtainOneByOwner(saveResult.id as number);

    return updatedResult as CarbonCertificate;
  }
}
