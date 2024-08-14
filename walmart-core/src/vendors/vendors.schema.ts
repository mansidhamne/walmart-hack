// vendor.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { VendorCategory } from './dto/create-vendor.dto';

export type VendorDocument = Vendor & Document;

@Schema()
export class Vendor {
  @Prop({ required: true, unique: true })
  vendorId: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  contact: string;

  @Prop({ type: String, enum: VendorCategory, required: true })
  category: string;

  @Prop()
  quality: number;

  @Prop()
  speed: number;

  @Prop()
  price: number;
}

export const VendorSchema = SchemaFactory.createForClass(Vendor);
