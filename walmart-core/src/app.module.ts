import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { ProductModule } from './products/products.module'; // Import your ProductModule or other modules
import { Counter, CounterSchema } from './products/counters.schema';
import { MulterModule } from '@nestjs/platform-express';
import { VendorModule } from './vendors/vendors.module';
import { HttpModule } from '@nestjs/axios';
import { PredictionService } from './predictions/prediction.service';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://mansidhamne22:XIp5Tn0aqQechOMw@cluster0.baiyc.mongodb.net/walmart?retryWrites=true&w=majority&appName=Cluster0',
    ),
    MongooseModule.forFeature([{ name: Counter.name, schema: CounterSchema }]),
    MulterModule.register({
      dest: './public/uploads/',
    }),
    ProductModule,
    VendorModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService, PredictionService],
})
export class AppModule {}
