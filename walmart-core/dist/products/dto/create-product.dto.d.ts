export declare enum ProductCategory {
    GROCERIES = 0,
    BEAUTY_PRODUCTS = 1,
    STATIONERY = 2,
    ACCESSORIES = 3,
    HOME_DECOR = 4
}
export declare class CreateProductDto {
    name: string;
    image: string;
    category: ProductCategory;
    inventory: number;
    price: number;
    status: number;
}
