import { OnModuleInit } from '@nestjs/common';
import { Model } from 'mongoose';
import { Counter } from './products/counters.schema';
export declare class AppService implements OnModuleInit {
    private counterModel;
    constructor(counterModel: Model<Counter>);
    onModuleInit(): Promise<void>;
}
