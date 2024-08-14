import { VendorService } from './vendors.service';
import { Vendor } from './vendors.schema';
import { CreateVendorDto, VendorCategory } from './dto/create-vendor.dto';
export declare class VendorsController {
    private readonly vendorService;
    constructor(vendorService: VendorService);
    createProduct(createVendorDto: CreateVendorDto): Promise<Vendor>;
    findAll(): Promise<Vendor[]>;
    uploadCSV(file: Express.Multer.File): Promise<{
        message: string;
    }>;
    findOne(vendorId: string): Promise<Vendor>;
    getVendorsByCategory(category: VendorCategory): Promise<Vendor[]>;
}
