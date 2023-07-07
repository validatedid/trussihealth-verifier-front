import { HttpStatus, INestApplication } from '@nestjs/common';
import { mock } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { SERVICE } from '../../../../src/config';
import { CredentialStatusService } from '../../../../src/modules/credentialStatus/credentialStatus.service';
import { CredentialStatusModule } from '../../../../src/modules/credentialStatus/credentialStatus.module';

describe('CredentialStatus controller', () => {
  let app: INestApplication;
  const credentialStatusService: CredentialStatusService =
    mock<CredentialStatusService>();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [CredentialStatusModule],
    })
      .overrideProvider(CredentialStatusService)
      .useValue(credentialStatusService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should check a credential status', async () => {
    const expectedResponse = { revoked: true };

    credentialStatusService.checkStatus = jest
      .fn()
      .mockResolvedValue(expectedResponse);

    const response = await request(app.getHttpServer())
      .get(
        SERVICE.BACKEND_PATHS.REVOKED.replace(':statusListId', '1').replace(
          ':credentialId',
          '2',
        ),
      )
      .send();
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toStrictEqual(expectedResponse);
  });
});
