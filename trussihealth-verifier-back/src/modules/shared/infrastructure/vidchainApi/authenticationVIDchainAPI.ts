import { Buffer } from 'buffer';
import { VIDchainAPIConnector } from './vidcahinAPIConnector';
import { Inject } from '@nestjs/common';
import { BASIC_AUTH } from '../../../../config';

interface AuthorizationHeaders {
  headers: {
    Authorization: string;
    Accept: string;
    'Content-Type': string;
  };
}

export interface EntityInfo {
  iss: string;
  apiKey: string;
}

export class AuthenticationVIDchainAPI {
  sessionToken: string;
  constructor(
    protected readonly vidchainAPIConnector: VIDchainAPIConnector,
    @Inject('EntityInfo') private readonly entityInfo: EntityInfo,
  ) {}

  private createAssertionPayload() {
    return {
      iss: this.entityInfo.iss,
      aud: 'vidchain-api',
      nonce: 'z-0427dc2515b1',
      apiKey: this.entityInfo.apiKey,
    };
  }

  private createSessionsBody() {
    return {
      grantType: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: Buffer.from(
        JSON.stringify(this.createAssertionPayload()),
      ).toString('base64'),
      scope: 'vidchain profile entity',
      expiresIn: 10,
    };
  }

  private async getAuthorizationToken(): Promise<string> {
    if (this.sessionToken && this.isSessionTokenValid()) {
      return this.sessionToken;
    }
    const sessionsBody = this.createSessionsBody();
    const { accessToken } = await this.vidchainAPIConnector.sessions(
      sessionsBody,
    );
    this.sessionToken = accessToken;
    return accessToken;
  }

  private isSessionTokenValid() {
    const { exp } = JSON.parse(
      Buffer.from(this.sessionToken.split('.')[1], 'base64').toString(),
    ) as { exp: number };
    return exp > Date.now() / 1000;
  }

  protected async getAuthorizationHeader(): Promise<AuthorizationHeaders> {
    return {
      headers: {
        Authorization: `Bearer ${await this.getAuthorizationToken()}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  }

  protected async getAuthorizationBasic(): Promise<AuthorizationHeaders> {
    return {
      headers: {
        Authorization: `Basic ${BASIC_AUTH}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  }
}
