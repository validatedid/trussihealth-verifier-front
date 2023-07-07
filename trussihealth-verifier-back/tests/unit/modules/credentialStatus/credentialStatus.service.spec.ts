import { mock } from 'jest-mock-extended';
import {
  RevocationStatus,
  StatusResponse,
} from '../../../../src/modules/shared/infrastructure/vidchainApi/revocationStatus';
import { CredentialStatusService } from '../../../../src/modules/credentialStatus/credentialStatus.service';

describe('CredentialStatus service', () => {
  const revocationStatus = mock<RevocationStatus>();
  const credentialStatusService = new CredentialStatusService(revocationStatus);
  it('should check the status of a credential and return revoked true', async () => {
    const revocationStatusResponse = { status: 'REVOKED' };
    revocationStatus.checkStatus.mockResolvedValue(
      revocationStatusResponse as StatusResponse,
    );
    await expect(
      credentialStatusService.checkStatus('1', '2'),
    ).resolves.toEqual({ revoked: true });
  });

  it('should check the status of a credential and return revoked false', async () => {
    const revocationStatusResponse = { status: 'OK' };
    revocationStatus.checkStatus.mockResolvedValue(
      revocationStatusResponse as StatusResponse,
    );
    await expect(
      credentialStatusService.checkStatus('1', '2'),
    ).resolves.toEqual({ revoked: false });
  });
});
