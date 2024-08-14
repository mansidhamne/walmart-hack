import { Model } from 'mongoose';
import { Vendor, VendorDocument } from './vendors.schema';
import { CreateVendorDto, VendorCategory } from './dto/create-vendor.dto';
import { CounterDocument } from 'src/vendors/counters.schema';
export declare class VendorService {
    private vendorModel;
    private counterModel;
    constructor(vendorModel: Model<VendorDocument>, counterModel: Model<CounterDocument>);
    createVendor(createVendorDto: CreateVendorDto): Promise<Vendor>;
    private generateVendorId;
    uploadCSV(filePath: string): Promise<void>;
    findAll(): Promise<Vendor[]>;
    findOne(vendorId: string): Promise<Vendor>;
    findVendorsByCategory(category: VendorCategory): Promise<Vendor[]>;
}
