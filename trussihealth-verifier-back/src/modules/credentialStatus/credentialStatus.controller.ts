import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { SERVICE } from '../../config';
import { CredentialStatusService } from './credentialStatus.service';

export interface CredentialStatusResponseDto {
  revoked: boolean;
}
@Controller()
export class CredentialStatusController {
  constructor(
    private readonly credentialStatusService: CredentialStatusService,
  ) {}

  @Get(`${SERVICE.BACKEND_PATHS.REVOKED}`)
  @HttpCode(200)
  async checkStatus(
    @Param('statusListId') statusListId: string,
    @Param('credentialId') credentialId: string,
  ): Promise<CredentialStatusResponseDto> {
    const result = await this.credentialStatusService.checkStatus(
      statusListId,
      credentialId,
    );
    return result;
  }
}
