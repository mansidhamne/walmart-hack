"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const vendors_schema_1 = require("./vendors.schema");
const counters_schema_1 = require("./counters.schema");
const csvParser = require("csv-parser");
const fs = require("fs");
let VendorService = class VendorService {
    constructor(vendorModel, counterModel) {
        this.vendorModel = vendorModel;
        this.counterModel = counterModel;
    }
    async createVendor(createVendorDto) {
        const vendorId = await this.generateVendorId();
        const createdVendor = new this.vendorModel({
            ...createVendorDto,
            vendorId,
        });
        return createdVendor.save();
    }
    async generateVendorId() {
        const counter = await this.counterModel.findByIdAndUpdate('vendor_id', { $inc: { sequence_value: 1 } }, { new: true, upsert: true });
        return `VEND${counter.sequence_value.toString().padStart(4, '0')}`;
    }
    async uploadCSV(filePath) {
        const results = [];
        console.log('Uploading CSV file:', filePath);
        return new Promise((resolve, reject) => {
            if (!fs.existsSync(filePath)) {
                reject(new Error('File not found'));
                return;
            }
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => {
                results.push({
                    name: data.name,
                    contact: data.contact,
                    category: data.category,
                    quality: parseFloat(data.quality),
                    speed: parseFloat(data.speed),
                    price: parseFloat(data.price),
                });
            })
                .on('end', async () => {
                try {
                    const vendorsWithId = await Promise.all(results.map(async (vendor) => ({
                        vendorId: await this.generateVendorId(),
                        ...vendor,
                    })));
                    await this.vendorModel.insertMany(vendorsWithId);
                    console.log('CSV file successfully processed and saved to database');
                    resolve();
                }
                catch (error) {
                    console.error('Error inserting data into MongoDB:', error);
                    reject(error);
                }
            })
                .on('error', (error) => {
                console.error('Error reading CSV file:', error);
                reject(error);
            });
        });
    }
    async findAll() {
        return this.vendorModel.find().exec();
    }
    async findOne(vendorId) {
        const vendor = await this.vendorModel.findOne({ vendorId }).exec();
        if (!vendor) {
            throw new common_1.NotFoundException(`Vendor with ID ${vendorId} not found`);
        }
        return vendor;
    }
    async findVendorsByCategory(category) {
        return this.vendorModel.find({ category }).exec();
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vendors_schema_1.Vendor.name)),
    __param(1, (0, mongoose_1.InjectModel)(counters_schema_1.Counter.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], VendorService);
//# sourceMappingURL=vendors.service.js.map