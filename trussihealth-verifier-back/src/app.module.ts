import { Module } from '@nestjs/common';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { EidasValidationModule } from './modules/eidasValidation/eidasValidation.module';
import { CredentialStatusModule } from './modules/credentialStatus/credentialStatus.module';

@Module({
  imports: [AuthorizationModule, EidasValidationModule, CredentialStatusModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
