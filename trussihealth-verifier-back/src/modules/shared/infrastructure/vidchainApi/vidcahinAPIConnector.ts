import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';

interface VIDchainSessionsResponse {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
  issuedAt: number;
}

interface AuthorizationHeaders {
  headers: {
    Authorization: string;
    Accept: string;
    'Content-Type': string;
  };
}

@Injectable()
export class VIDchainAPIConnector {
  constructor(
    @Inject('VIDchainAPIUrl') private readonly vidchainAPIUrl: string,
    @Inject('OpenIdAPIUrl') private readonly openIdAPIUrl: string,
  ) {}

  async sessions(sessionsBody: unknown): Promise<VIDchainSessionsResponse> {
    const response = await axios.post(
      `${this.vidchainAPIUrl}/sessions`,
      sessionsBody,
    );
    return response.data;
  }

  async validateEidasSeal(
    vcBody: unknown,
    authorization: AuthorizationHeaders,
  ): Promise<unknown> {
    try {
      const response = await axios.post(
        `${this.vidchainAPIUrl}/eidas/signature-validations`,
        vcBody,
        authorization,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async checkCredentialStatus(
    statusListId: string,
    credentialId: string,
    authorization: AuthorizationHeaders,
  ): Promise<unknown> {
    try {
      const response = await axios.get(
        `${this.vidchainAPIUrl}/revocation/credential-status/status-list/${statusListId}/credential/${credentialId}`,
        authorization,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getData(
    documentId: string,
    authorization: AuthorizationHeaders,
  ): Promise<unknown> {
    try {
      const response = await axios.get(
        `${this.openIdAPIUrl}/health-data/${documentId}`,
        authorization,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
