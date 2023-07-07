import { AuthenticationVIDchainAPI } from './authenticationVIDchainAPI';
import {
  EidasValidatorResponseDto,
  EidasValidatorResponseFailDto,
} from './eidasValidator.interface';
import { VerifiableCredential } from './verifiableCredential.interface';

export class EidasValidatior extends AuthenticationVIDchainAPI {
  async validate(
    verifiableCredential: VerifiableCredential,
  ): Promise<EidasValidatorResponseDto | EidasValidatorResponseFailDto> {
    const authorization = await this.getAuthorizationHeader();
    return (await this.vidchainAPIConnector.validateEidasSeal(
      verifiableCredential,
      authorization,
    )) as unknown as EidasValidatorResponseDto;
  }
}
