// vendor.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorService } from './vendors.service';
import { VendorsController } from './vendors.controller';
import { Vendor, VendorSchema } from './vendors.schema';
import { Counter, CounterSchema } from './counters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vendor.name, schema: VendorSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  providers: [VendorService],
  controllers: [VendorsController],
})
export class VendorModule {}
