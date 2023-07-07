import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthorizationService } from './authorization.service';
import { SERVICE } from '../../config';

export interface AuthorizationDto {
  code: string;
  redirectUri: string;
}

export interface AuthorizationResponseDto {
  verifiableCredential: object;
}

@Controller()
export class AuthorizationController {
  constructor(private readonly authorizationService: AuthorizationService) {}

  @Post(`${SERVICE.BACKEND_PATHS.AUTHORIZE}`)
  @HttpCode(200)
  async authorize(
    @Body() loginAuthenticationDto: AuthorizationDto,
  ): Promise<AuthorizationResponseDto> {
    const result = await this.authorizationService.authorize(
      loginAuthenticationDto,
    );
    return result;
  }
}
