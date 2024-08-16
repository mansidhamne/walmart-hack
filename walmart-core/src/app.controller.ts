import { Controller, Get, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { PredictionService } from './predictions/prediction.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly predictionService: PredictionService,
  ) {}

  @Get()
  async getHello() {
    return 'Hello World!';
  }

  @Get('predict')
  async getPrediction(@Body() data: any) {
    return this.predictionService.getPrediction(data);
  }
}
