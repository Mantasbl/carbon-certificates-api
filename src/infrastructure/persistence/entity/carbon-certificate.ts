import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CertificateStatusType } from '../../../domain/types/carbon-certificate';
import { User } from './user';

@Entity()
export class CarbonCertificate {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @Index()
  @Column({ nullable: false })
  country: string;

  @Index()
  @Column({ type: 'enum', nullable: false, enum: CertificateStatusType })
  status: CertificateStatusType;

  @OneToOne(() => User, (user) => user.id)
  @JoinColumn({ referencedColumnName: 'id' })
  owner?: User;

  constructor(country: string, status: CertificateStatusType, owner?: User) {
    this.country = country;
    this.status = status;
    this.owner = owner;
  }
}
