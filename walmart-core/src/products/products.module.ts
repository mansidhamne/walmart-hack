import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './products.schema';
import { ProductService } from './products.service';
import { ProductsController } from './products.controller';
import { Counter, CounterSchema } from './counters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
  ],
  providers: [ProductService],
  controllers: [ProductsController],
})
export class ProductModule {}
