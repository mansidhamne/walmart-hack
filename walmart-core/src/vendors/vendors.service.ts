import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor, VendorDocument } from './vendors.schema';
import { CreateVendorDto, VendorCategory } from './dto/create-vendor.dto';
import { Counter, CounterDocument } from 'src/vendors/counters.schema';
import * as csvParser from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel(Vendor.name) private vendorModel: Model<VendorDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
  ) {}

  async createVendor(createVendorDto: CreateVendorDto): Promise<Vendor> {
    const vendorId = await this.generateVendorId();
    const createdVendor = new this.vendorModel({
      ...createVendorDto,
      vendorId,
    });
    return createdVendor.save();
  }

  private async generateVendorId(): Promise<string> {
    const counter = await this.counterModel.findByIdAndUpdate(
      'vendor_id',
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true },
    );
    return `VEND${counter.sequence_value.toString().padStart(4, '0')}`;
  }

  async uploadCSV(filePath: string): Promise<void> {
    const results: Omit<CreateVendorDto, 'vendorId'>[] = [];

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
            // Generate vendor IDs and create vendor objects with IDs
            const vendorsWithId = await Promise.all(
              results.map(async (vendor) => ({
                vendorId: await this.generateVendorId(),
                ...vendor,
              })),
            );

            await this.vendorModel.insertMany(vendorsWithId);
            console.log(
              'CSV file successfully processed and saved to database',
            );
            resolve();
          } catch (error) {
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

  async findAll(): Promise<Vendor[]> {
    return this.vendorModel.find().exec();
  }

  async findOne(vendorId: string): Promise<Vendor> {
    const vendor = await this.vendorModel.findOne({ vendorId }).exec();
    if (!vendor) {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }
    return vendor;
  }

  async findVendorsByCategory(category: VendorCategory): Promise<Vendor[]> {
    return this.vendorModel.find({ category }).exec();
  }
}
