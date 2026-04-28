import { createSlice } from "@reduxjs/toolkit";
import { ProductsPageState } from "../../../lib/types/screen";

const initialState: ProductsPageState = {
  shop: null, //boshlangich qiymati null
  chosenProduct: null,
  products: [],
};

//slice ni hosil qilish
const productsPageSlice = createSlice({
  name: "productsPage", //slice ning nomi
  initialState, //yuqorida hosil qilingan boshlangich qiymatlar
  reducers: {
    setShop: (state, action) => {
      state.shop = action.payload;
    },
    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

//Reducer va action nomlari bir xil nomlanadi(standardga kura).

//tashqarida ishlatish un, actionlarni export qilish:
export const { setShop, setChosenProduct, setProducts } =
  productsPageSlice.actions;

//yahlit holatda esa store.ts(reduce store)ga boglash un. yani export const store = configureStore({ reducer: { },});
const ProductsPageReducer = productsPageSlice.reducer;
export default ProductsPageReducer;
//bu reducer react storega boglangan hisoblanadi
