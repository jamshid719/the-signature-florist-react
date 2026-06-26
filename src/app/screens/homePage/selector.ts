import { createSelector } from "reselect";
import { AppRootState, HomePageState } from "../../../lib/types/screen";

//HomePage screen componentiga daxldor bulgan storageini (react storedan) qulga olish. (screen.ts)
const selectHomePage = (state: AppRootState) => state.homePage;

//va malumotlarni qabul qilish(retrieve)
export const retrievePopularProducts = createSelector(
  selectHomePage,
  (homePage: HomePageState) => homePage.popularProducts,
);

export const retrieveNewProducts = createSelector(
  selectHomePage,
  (homePage: HomePageState) => homePage.newProducts,
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (homePage: HomePageState) => homePage.topUsers,
);
// by yerdagi (HomePage) => selectHomePage qaytargan qiymat, yani state.homePage
