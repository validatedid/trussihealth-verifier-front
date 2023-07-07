import axios from 'axios';
import { Inject } from '@nestjs/common';

export interface OpenIdConfig {
  url: string;
  client_id: string;
  client_secret: string;
}

export interface OauthToken {
  access_token: string;
  expires_in: number;
  id_token: string;
  scope: string;
  token_type: string;
}
export class OpenIdApi {
  constructor(
    @Inject('OpenIdConfiguration') private readonly config: OpenIdConfig,
  ) {}

  private readonly headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  async getOauthToken(code: string, redirectUri: string): Promise<OauthToken> {
    const body = this.getBody(code, redirectUri);
    const headers = this.headers;
    const oauthTokenUrl = `${this.config.url}/oauth2/token`;
    const response = await axios.post(
      oauthTokenUrl,
      new URLSearchParams(body).toString(),
      { headers },
    );
    return response.data;
  }

  private getBody(code: string, redirectUri: string) {
    return {
      code: code,
      client_id: this.config.client_id,
      client_secret: this.config.client_secret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    };
  }
}
