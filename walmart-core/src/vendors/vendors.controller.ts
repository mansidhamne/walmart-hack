import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VendorService } from './vendors.service';
import { Vendor } from './vendors.schema';
import { CreateVendorDto, VendorCategory } from './dto/create-vendor.dto';

@Controller('vendors')
export class VendorsController {
  constructor(private readonly vendorService: VendorService) {}

  @Post()
  async createProduct(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.createVendor(createVendorDto);
  }

  @Get()
  async findAll() {
    return this.vendorService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', { dest: './public/uploads/' }))
  async uploadCSV(@UploadedFile() file: Express.Multer.File) {
    await this.vendorService.uploadCSV(file.path);
    return { message: 'File uploaded successfully' };
  }

  @Get(':vendorId')
  async findOne(@Param('vendorId') vendorId: string): Promise<Vendor> {
    return this.vendorService.findOne(vendorId);
  }

  @Get('category/:category')
  async getVendorsByCategory(@Param('category') category: VendorCategory) {
    return this.vendorService.findVendorsByCategory(category);
  }
}
