import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './products.schema';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductService);
    createProduct(createProductDto: CreateProductDto): Promise<Product>;
    findAll(): Promise<Product[]>;
    findOne(productId: string): Promise<Product>;
    update(productId: string, updateProductDto: CreateProductDto): Promise<Product>;
    remove(productId: string): Promise<import("mongoose").Document<unknown, {}, import("./products.schema").ProductDocument> & Product & import("mongoose").Document<unknown, any, any> & Required<{
        _id: unknown;
    }>>;
}
