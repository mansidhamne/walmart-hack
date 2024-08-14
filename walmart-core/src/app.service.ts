// import { Injectable } from '@nestjs/common';

// @Injectable()
// export class AppService {
//   async getHello() {
//     return 'Hello World!';
//   }
// }

import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter } from './products/counters.schema';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(
    @InjectModel(Counter.name) private counterModel: Model<Counter>,
  ) {}

  async onModuleInit() {
    await this.counterModel.findOneAndUpdate(
      { _id: 'product_id' },
      { $setOnInsert: { sequence_value: 0 } },
      { upsert: true, new: true },
    );
  }
}
