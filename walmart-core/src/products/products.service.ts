import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { Counter, CounterDocument } from './counters.schema';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const productId = await this.generateProductId();
    const createdProduct = new this.productModel({
      ...createProductDto,
      productId,
    });
    return createdProduct.save();
  }

  private async generateProductId(): Promise<string> {
    const counter = await this.counterModel.findByIdAndUpdate(
      'product_id',
      { $inc: { sequence_value: 1 } },
      { new: true, upsert: true },
    );
    return `PROD${counter.sequence_value.toString().padStart(4, '0')}`;
  }

  async updateProduct(
    productId: string,
    updateProductDto: CreateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findOneAndUpdate(
        { productId },
        { $set: updateProductDto },
        { new: true }, // Return the modified document rather than the original
      )
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return updatedProduct;
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async findOne(productId: string): Promise<Product> {
    const product = await this.productModel.findOne({ productId }).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }
    return product;
  }

  async remove(productId: string) {
    return await this.productModel.findOneAndDelete({ productId }).exec();
  }
}
