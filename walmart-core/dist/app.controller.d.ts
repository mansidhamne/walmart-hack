import { AppService } from './app.service';
import { PredictionService } from './predictions/prediction.service';
export declare class AppController {
    private readonly appService;
    private readonly predictionService;
    constructor(appService: AppService, predictionService: PredictionService);
    getHello(): Promise<string>;
    getPrediction(data: any): Promise<any>;
}
