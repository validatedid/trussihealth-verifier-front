import { AuthenticationVIDchainAPI } from './authenticationVIDchainAPI';


export class HealthData extends AuthenticationVIDchainAPI {
  async getData(documentId: string): Promise<unknown> {
    const authorization = await this.getAuthorizationBasic();
    return await this.vidchainAPIConnector.getData(documentId, authorization);
  }
}
