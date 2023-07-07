import { Module } from '@nestjs/common';
import { AuthorizationController } from './authorization.controller';
import { AuthorizationService } from './authorization.service';
import { OpenIdApi, OpenIdConfig } from '../shared/infrastructure/openIdAPI';
import { OPENID } from '../../config';

const openIDConfiguration = {
  provide: 'OpenIdConfiguration',
  useFactory: () => {
    const config: OpenIdConfig = {
      url: OPENID.URL,
      client_id: OPENID.CLIENT_ID,
      client_secret: OPENID.CLIENT_SECRET,
    };
    return config;
  },
};
@Module({
  imports: [],
  controllers: [AuthorizationController],
  providers: [openIDConfiguration, OpenIdApi, AuthorizationService],
})
export class AuthorizationModule {}
