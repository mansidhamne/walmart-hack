import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ProductCategory } from './dto/create-product.dto';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ required: true })
  name: string;

  @Prop()
  image: string;

  @Prop({ type: String, enum: ProductCategory, required: true })
  category: string;

  @Prop()
  inventory: number;

  @Prop({ required: true })
  price: number;

  @Prop({ default: 0 })
  status: number;

  @Prop({ required: true, unique: true })
  productId: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
