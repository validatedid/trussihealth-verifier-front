import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { SERVICE } from '../../config';
import { HealthDataService } from './healthData.service';

export interface HealthDataResponseDto {
  data: string;
}
@Controller()
export class HealthDataController {
  constructor(private readonly healthDataService: HealthDataService) {
    console.log('Here');
  }

  @Get(`${SERVICE.BACKEND_PATHS.HEALTH}`)
  @HttpCode(200)
  async checkStatus(@Param('documentId') documentId: string): Promise<unknown> {
    const result = await this.healthDataService.getData(documentId);
    return result;
  }
}
