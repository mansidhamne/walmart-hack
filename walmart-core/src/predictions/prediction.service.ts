import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class PredictionService {
  constructor(private readonly httpService: HttpService) {}

  async getPrediction(data: any): Promise<any> {
    const url = 'http://localhost:5000/predict'; // URL of your Flask service
    const response = await firstValueFrom(this.httpService.post(url, data));
    return response.data;
  }
}
