export enum ProductCategory {
  GROCERIES,
  BEAUTY_PRODUCTS,
  STATIONERY,
  ACCESSORIES,
  HOME_DECOR,
}

export class CreateProductDto {
  name: string;
  image: string;
  category: ProductCategory;
  inventory: number;
  price: number;
  status: number;
}
