import { HttpStatus, INestApplication } from '@nestjs/common';
import { AuthorizationService } from '../../../../src/modules/authorization/authorization.service';
import { mock } from 'jest-mock-extended';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthorizationModule } from '../../../../src/modules/authorization/authorization.module';
import {
  AuthorizationDto,
  AuthorizationResponseDto,
} from '../../../../src/modules/authorization/authorization.controller';
import * as request from 'supertest';
import { SERVICE } from '../../../../src/config';

describe('authentication controller', () => {
  let app: INestApplication;
  const authorizationService: AuthorizationService =
    mock<AuthorizationService>();

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AuthorizationModule],
    })
      .overrideProvider(AuthorizationService)
      .useValue(authorizationService)
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

  it('should authorize an OpenID connect request', async () => {
    authorizationService.authorize = jest.fn().mockResolvedValue({
      verifiableCredential: {},
    } as unknown as AuthorizationResponseDto);

    const authorizationDto: AuthorizationDto = {
      code: 'code',
      redirectUri: 'redirectUri',
    };
    const expectedResponse: AuthorizationResponseDto = {
      verifiableCredential: {},
    };
    const response = await request(app.getHttpServer())
      .post(`${SERVICE.BACKEND_PATHS.AUTHORIZE}`)
      .send(authorizationDto);
    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toStrictEqual(expectedResponse);
  });
});
