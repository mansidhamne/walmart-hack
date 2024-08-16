export enum VendorCategory {
  GROCERIES,
  BEAUTY_PRODUCTS,
  STATIONERY,
  ACCESSORIES,
  HOME_DECOR,
}

export class CreateVendorDto {
  name: string;
  contact: string;
  category: VendorCategory;
  quality: number;
  speed: number;
  price: number;
}
