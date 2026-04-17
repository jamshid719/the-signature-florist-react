import { createSelector } from "reselect";
import {
  AppRootState,
  OrdersPageState,
  ProductsPageState,
} from "../../../lib/types/screen";
import HomePage from ".";

//OrdersPage screen componentiga daxldor bulgan storageini (react storedan) qulga olish. (screen.ts)
const selectOrdersPage = (state: AppRootState) => state.ordersPage;

//va malumotlarni qabul qilish(retrieve)
export const retrievePausedOrders = createSelector(
  selectOrdersPage,
  (ordersPage: OrdersPageState) => ordersPage.pausedOrders,
);

export const retrieveProcessOrders = createSelector(
  selectOrdersPage,
  (productsPage: OrdersPageState) => productsPage.processOrders,
);

export const retrieveFinishedOrders = createSelector(
  selectOrdersPage,
  (productsPage: OrdersPageState) => productsPage.finishedOrders,
);
// by yerdagi (ordersPage) => selectOrdersPage qaytargan qiymat, yani state.OrdersPage
