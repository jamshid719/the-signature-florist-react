import { createSelector } from "reselect";
import { AppRootState, HomePageState } from "../../../lib/types/screen";
import HomePage from "./index";

//HomePage screen componentiga daxldor bulgan storageini (react storedan) qulga olish. (screen.ts)
const selectHomePage = (state: AppRootState) => state.homePage;

//va malumotlarni qabul qilish(retrieve)
export const retrievePopularDishes = createSelector(
  selectHomePage,
  (homePage: HomePageState) => homePage.popularDishes,
);

export const retrieveNewDishes = createSelector(
  selectHomePage,
  (homePage: HomePageState) => homePage.newDishes,
);

export const retrieveTopUsers = createSelector(
  selectHomePage,
  (homePage: HomePageState) => homePage.topUsers,
);
// by yerdagi (HomePage) => selectHomePage qaytargan qiymat, yani state.homePage
