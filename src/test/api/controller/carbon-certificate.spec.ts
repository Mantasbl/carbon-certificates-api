import { ExecutionContext } from '@nestjs/common';
import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { Test } from '@nestjs/testing';

import { JwtStrategy } from '../../../api/auth/jwt.strategy';
import { CarbonCertificateController } from '../../../api/controllers/carbon-certificate-controller';
import { JwtAuthGuard } from '../../../api/guards/jwt-auth-guard';
import { CarbonCertificateServiceImpl } from '../../../domain/services/carbon-certificates';
import { CertificateStatusType } from '../../../domain/types/carbon-certificate';
import { useFastifyAdapter } from '../../../framework/fastify-adapter';
import { factory, value } from '../../../framework/provider';
import { CarbonCertificateEntityManager } from '../../../infrastructure/persistence/repository/carbon-certificate';
import { UserEntityManager } from '../../../infrastructure/persistence/repository/user';
import { USER } from '../../dummies/request';
import { CARBONCERTIFICATE_REPOSITORY_MOCK, USER_REPOSITORY_MOCK } from '../../mocks/repository';

describe('CarbonCertificateController', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CarbonCertificateController],
      providers: [
        factory(CarbonCertificateServiceImpl, [CarbonCertificateEntityManager, UserEntityManager]),
        value(UserEntityManager, USER_REPOSITORY_MOCK),
        value(CarbonCertificateEntityManager, CARBONCERTIFICATE_REPOSITORY_MOCK),
        JwtStrategy,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({
        canActivate: (context: ExecutionContext) => {
          const req = context.switchToHttp().getRequest();

          req.user = USER;
          return true;
        },
      })
      .compile();

    app = module.createNestApplication<NestFastifyApplication>(useFastifyAdapter());
  });

  it('GET /v1/certificates`, should return requested certificate information', async () => {
    const obtainFn = CARBONCERTIFICATE_REPOSITORY_MOCK.obtainManyByOwner.mockResolvedValue([
      {
        id: 1,
        country: 'United Kingdom',
        status: CertificateStatusType.OWNED,
        owner: {
          id: 1,
          username: 'Josh',
          password: 'unknown',
        },
      },
    ]);

    const response = await app.inject({
      method: 'GET',
      url: '/v1/certificates',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual({
      data: [
        {
          country: 'United Kingdom',
          status: CertificateStatusType.OWNED,
          owner: {
            id: 1,
            username: 'Josh',
            password: 'unknown',
          },
        },
      ],
    });

    expect(obtainFn).toBeCalledTimes(1);
  });

  it('GET /v1/ownerless-certificates`, should return requested certificate information', async () => {
    const obtainFn = CARBONCERTIFICATE_REPOSITORY_MOCK.obtainManyOwnerless.mockResolvedValue([
      {
        id: 1,
        country: 'United Kingdom',
        status: CertificateStatusType.AVAILABLE,
      },
      {
        id: 2,
        country: 'China',
        status: CertificateStatusType.AVAILABLE,
      },
    ]);

    const response = await app.inject({
      method: 'GET',
      url: '/v1/ownerless-certificates',
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual({
      data: [
        {
          country: 'United Kingdom',
          status: CertificateStatusType.AVAILABLE,
        },
        {
          country: 'China',
          status: CertificateStatusType.AVAILABLE,
        },
      ],
    });

    expect(obtainFn).toBeCalledTimes(1);
  });

  it('PATCH /v1/certificates/12`, should return updated certificate information', async () => {
    const patchFn = CARBONCERTIFICATE_REPOSITORY_MOCK.updateOneOwnership.mockResolvedValue({
      id: 1,
      country: 'United Kingdom',
      status: CertificateStatusType.TRANSFERED,
      owner: {
        id: 3,
        username: 'Josh',
        password: 'unknown',
      },
    });

    const userFn = USER_REPOSITORY_MOCK.obtainUserByUsername.mockResolvedValue({
      id: 3,
      username: 'Josh',
      password: 'unknown',
    });

    const response = await app.inject({
      method: 'PATCH',
      url: '/v1/certificates/12',
      payload: {
        newOwner: 'Josh',
      },
    });

    expect(response.statusCode).toEqual(200);
    expect(response.json()).toEqual({
      data: {
        country: 'United Kingdom',
        status: CertificateStatusType.TRANSFERED,
        owner: {
          id: 3,
          username: 'Josh',
          password: 'unknown',
        },
      },
    });

    expect(userFn).toBeCalledTimes(1);
    expect(patchFn).toBeCalledTimes(1);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });
});
