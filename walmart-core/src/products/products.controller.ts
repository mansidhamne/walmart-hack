import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.schema';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':productId')
  async findOne(@Param('productId') productId: string): Promise<Product> {
    return this.productService.findOne(productId);
  }

  @Put(':productId')
  async update(
    @Param('productId') productId: string,
    @Body() updateProductDto: CreateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(productId, updateProductDto);
  }

  @Delete(':productId')
  async remove(@Param('productId') productId: string) {
    return this.productService.remove(productId);
  }
}
