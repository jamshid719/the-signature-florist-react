import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
  popularProducts: [], //boshlangich qiymati bush array
  newProducts: [],
  topUsers: [],
};

//slice ni hosil qilish
const homePageSlice = createSlice({
  name: "homePage", //slice ning nomi
  initialState, //yuqorida hosil qilingan boshlangich qiymatlar
  reducers: {
    setPopularProducts: (state, action) => {
      state.popularProducts = action.payload;
    }, // bu yerda setPopularProducts reducer ishga tushgan payti, unga state va action beriladi. state yuqoridagi initialState, action esa mana shu redux storega saqlamoqchi bulgan datamiz payload qismida keladi. Qisqacha qilib aytganda, actionning payload qismidan kirib kelayotgan malumotni, yuqoridagi initialStateda joylashgan popularProducts nomli keyni value siga tenglashtir degani.(backend dan keladigan DATA shu action ning payload qismida keladi.)
    setNewProducts: (state, action) => {
      state.newProducts = action.payload;
    },
    setTopUsers: (state, action) => {
      state.topUsers = action.payload;
    },
  },
});

//Reducer va action nomlari bir xil nomlanadi(standardga kura).

//tashqarida ishlatish un, actionlarni export qilish:
export const { setPopularProducts, setNewProducts, setTopUsers } =
  homePageSlice.actions; //PS: bu actionlarni homepagening index.ts filedagi useEffectda ishlatish un export qilinayapti.

//yahlit holatda esa store.ts(reduce store)ga boglash un. yani export const store = configureStore({ reducer: { },});
const HomePageReducer = homePageSlice.reducer;
export default HomePageReducer;
//bu reducer react storega boglangan hisoblanadi
