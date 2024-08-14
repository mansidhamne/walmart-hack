import { Model } from 'mongoose';
import { Product, ProductDocument } from './products.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { CounterDocument } from './counters.schema';
export declare class ProductService {
    private productModel;
    private counterModel;
    constructor(productModel: Model<ProductDocument>, counterModel: Model<CounterDocument>);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    private generateProductId;
    updateProduct(productId: string, updateProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(productId: string): Promise<Product>;
    remove(productId: string): Promise<import("mongoose").Document<unknown, {}, ProductDocument> & Product & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
}
