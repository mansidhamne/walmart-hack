import { HttpService } from '@nestjs/axios';
export declare class PredictionService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getPrediction(data: any): Promise<any>;
}
