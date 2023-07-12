import { Module } from '@nestjs/common';
import { HealthDataController } from './healthData.controller';
import { HealthDataService } from './healthData.service';
import { OPENID, VIDCHAIN } from '../../config';
import { EntityInfo } from '../shared/infrastructure/vidchainApi/authenticationVIDchainAPI';
import { VIDchainAPIConnector } from '../shared/infrastructure/vidchainApi/vidcahinAPIConnector';
import { HealthData } from '../shared/infrastructure/vidchainApi/healthData';

const entityInfo = {
  provide: 'EntityInfo',
  useFactory: () => {
    const config: EntityInfo = {
      iss: VIDCHAIN.ISS,
      apiKey: VIDCHAIN.API_KEY,
    };
    return config;
  },
};

const vidchainAPIUrl = {
  provide: 'VIDchainAPIUrl',
  useFactory: () => {
    return VIDCHAIN.URL;
  },
};

const openIdAPIUrl = {
  provide: 'OpenIdAPIUrl',
  useFactory: () => {
    return OPENID.URL;
  },
};

@Module({
  imports: [],
  controllers: [HealthDataController],
  providers: [
    entityInfo,
    vidchainAPIUrl,
    openIdAPIUrl,
    HealthData,
    HealthDataService,
    VIDchainAPIConnector,
  ],
})
export class HealthDataModule {}
