import { Document } from 'mongoose';
export type VendorDocument = Vendor & Document;
export declare class Vendor {
    vendorId: string;
    name: string;
    contact: string;
    category: string;
    quality: number;
    speed: number;
    price: number;
}
export declare const VendorSchema: import("mongoose").Schema<Vendor, import("mongoose").Model<Vendor, any, any, any, Document<unknown, any, Vendor> & Vendor & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Vendor, Document<unknown, {}, import("mongoose").FlatRecord<Vendor>> & import("mongoose").FlatRecord<Vendor> & {
    _id: import("mongoose").Types.ObjectId;
}>;
