import { Injectable } from '@nestjs/common';
import { CredentialStatusResponseDto } from './credentialStatus.controller';
import { RevocationStatus } from '../shared/infrastructure/vidchainApi/revocationStatus';

@Injectable()
export class CredentialStatusService {
  constructor(private revocationStatus: RevocationStatus) {}

  async checkStatus(
    statusListId: string,
    credentialId: string,
  ): Promise<CredentialStatusResponseDto> {
    try {
      const result = await this.revocationStatus.checkStatus(
        statusListId,
        credentialId,
      );
      return { revoked: result.status === 'REVOKED' };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
