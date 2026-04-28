import {
  ProductCollection,
  ProductItemSize,
  ProductSize,
  ProductStatus,
  ProductVolume,
} from "../enums/product.enum";

//productga daxlador bulgan type integratsiyalar
export interface Product {
  _id: string; // FR.dan string holatda yuboramiz, ObjectId bn emas
  productStatus: ProductStatus;
  productCollection: ProductCollection;
  productName: string;
  productPrice: number;
  productLeftCount: number;
  productSize: ProductSize;
  productVolume: ProductVolume;
  productItemSize: ProductItemSize;
  productDesc?: string;
  productImages: string[];
  productViews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductInquiry {
  order: string;
  page: number;
  limit: number;
  productCollection?: ProductCollection;
  search?: string;
  excludeCollection?: ProductCollection;
}
