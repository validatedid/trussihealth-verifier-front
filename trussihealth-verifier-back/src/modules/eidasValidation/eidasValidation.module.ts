import { Module } from '@nestjs/common';
import { EidasValidationController } from './eidasValidation.controller';
import { EidasValidationService } from './eidasValidation.service';
import { VIDCHAIN } from '../../config';
import { EntityInfo } from '../shared/infrastructure/vidchainApi/authenticationVIDchainAPI';
import { EidasValidatior } from '../shared/infrastructure/vidchainApi/eidasValidatior';
import { VIDchainAPIConnector } from '../shared/infrastructure/vidchainApi/vidcahinAPIConnector';

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

@Module({
  imports: [],
  controllers: [EidasValidationController],
  providers: [
    entityInfo,
    vidchainAPIUrl,
    EidasValidatior,
    EidasValidationService,
    VIDchainAPIConnector,
  ],
})
export class EidasValidationModule {}
