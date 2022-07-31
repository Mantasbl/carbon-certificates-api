import { mocked } from 'jest-mock';

import { CarbonCertificateRepository } from '../../domain/capabilities/carbon-certificates-repository';
import { UserRepository } from '../../domain/capabilities/user-repository';

export const CARBONCERTIFICATE_REPOSITORY_MOCK = mocked<CarbonCertificateRepository>({
  obtainManyByOwner: jest.fn(),
  obtainManyOwnerless: jest.fn(),
  obtainOneByOwner: jest.fn(),
  updateOneOwnership: jest.fn(),
});

export const USER_REPOSITORY_MOCK = mocked<UserRepository>({
  obtainUserByUsername: jest.fn(),
});
