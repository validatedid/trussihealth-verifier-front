import { Injectable } from '@nestjs/common';
import {
  AuthorizationDto,
  AuthorizationResponseDto,
} from './authorization.controller';
import { OpenIdApi } from '../shared/infrastructure/openIdAPI';
import { IdToken } from './domain/idToken';

@Injectable()
export class AuthorizationService {
  constructor(private openIdApi: OpenIdApi) {}
  async authorize(
    authorizationDto: AuthorizationDto,
  ): Promise<AuthorizationResponseDto> {
    const oauthToken = await this.openIdApi.getOauthToken(
      authorizationDto.code,
      authorizationDto.redirectUri,
    );

    const idToken = new IdToken(oauthToken.id_token);
    const verifiableCredential = idToken.getVerifiableCredential();
    if (!verifiableCredential) {
      throw new Error('No verifiable credential found in id token');
    }

    return {
      verifiableCredential: verifiableCredential as object,
    };
  }
}
