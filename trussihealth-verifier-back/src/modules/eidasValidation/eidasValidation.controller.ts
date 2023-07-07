import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { SERVICE } from '../../config';
import {
  EidasValidationResponseDto,
  EidasValidationService,
} from './eidasValidation.service';

export interface VerifiableCredentialDto {
  verifiableCredential: unknown;
}
@Controller()
export class EidasValidationController {
  constructor(
    private readonly eidasValidationService: EidasValidationService,
  ) {}

  @Post(`${SERVICE.BACKEND_PATHS.VALIDATE}`)
  @HttpCode(200)
  async validate(
    @Body() verifiableCredentialDto: VerifiableCredentialDto,
  ): Promise<EidasValidationResponseDto> {
    const result = await this.eidasValidationService.validate(
      verifiableCredentialDto,
    );
    return result;
  }
}
