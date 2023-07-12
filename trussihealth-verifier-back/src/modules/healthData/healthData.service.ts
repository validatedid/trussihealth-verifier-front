import { Injectable } from '@nestjs/common';
import { HealthDataResponseDto } from './healthData.controller';
import { HealthData } from '../shared/infrastructure/vidchainApi/healthData';

@Injectable()
export class HealthDataService {
  constructor(private healthData: HealthData) {}

  async getData(documentId: string): Promise<unknown> {
    try {
      const result = await this.healthData.getData(documentId);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
