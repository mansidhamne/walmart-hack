export declare enum VendorCategory {
    GROCERIES = 0,
    BEAUTY_PRODUCTS = 1,
    STATIONERY = 2,
    ACCESSORIES = 3,
    HOME_DECOR = 4
}
export declare class CreateVendorDto {
    name: string;
    contact: string;
    category: VendorCategory;
    quality: number;
    speed: number;
    price: number;
}
