import { createSelector } from "reselect";
import { AppRootState, ProductsPageState } from "../../../lib/types/screen";
import HomePage from ".";

//ProductsPage screen componentiga daxldor bulgan storageini (react storedan) qulga olish. (screen.ts)
const selectProductsPage = (state: AppRootState) => state.productsPage;

//va malumotlarni qabul qilish(retrieve)
export const retrieveRestaurant = createSelector(
  selectProductsPage,
  (productsPage: ProductsPageState) => productsPage.restaurant,
);

export const retrieveChosenProduct = createSelector(
  selectProductsPage,
  (productsPage: ProductsPageState) => productsPage.chosenProduct,
);

export const retrieveProducts = createSelector(
  selectProductsPage,
  (productsPage: ProductsPageState) => productsPage.products,
);
// by yerdagi (productsPage) => selectProductsPage qaytargan qiymat, yani state.ProductsPage
