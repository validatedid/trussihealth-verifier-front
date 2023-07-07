import { AuthenticationVIDchainAPI } from './authenticationVIDchainAPI';

export interface StatusResponse {
  status: 'OK' | 'REVOKED';
}
export class RevocationStatus extends AuthenticationVIDchainAPI {
  async checkStatus(
    statusListId: string,
    credentialId: string,
  ): Promise<StatusResponse> {
    const authorization = await this.getAuthorizationHeader();
    return (await this.vidchainAPIConnector.checkCredentialStatus(
      statusListId,
      credentialId,
      authorization,
    )) as StatusResponse;
  }
}
