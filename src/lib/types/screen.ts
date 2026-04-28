import { Member } from "./member";
import { Order } from "./orders";
import { Product } from "./product";

/** REACT APP STATE (butun applicationning malumotlarning type integratsiyasi)*/
export interface AppRootState {
  homePage: HomePageState; // homePage da ishlatiladigan jamiki datalarni type integratsiyasini HomePageState bn belgilab olamiz.
  productsPage: ProductsPageState;
  ordersPage: OrdersPageState;
}

/** HOMEPAGE */
export interface HomePageState {
  //homepageda 3 toifadagi datalarga ehtiyoj bor.
  popularProducts: Product[];
  newProducts: Product[];
  topUsers: Member[];
}

/** PRODUCT PAGE */
export interface ProductsPageState {
  shop: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/** ORDERS PAGE */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
