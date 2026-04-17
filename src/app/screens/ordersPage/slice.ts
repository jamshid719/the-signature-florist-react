import { createSlice } from "@reduxjs/toolkit";
import { OrdersPageState } from "../../../lib/types/screen";

const initialState: OrdersPageState = {
  pausedOrders: [], //boshlangich qiymati bush array
  processOrders: [], //boshlangich qiymati bush array
  finishedOrders: [], //boshlangich qiymati bush array
};

//slice ni hosil qilish
const ordersPageSlice = createSlice({
  name: "OrdersPage", //slice ning nomi
  initialState, //yuqorida hosil qilingan boshlangich qiymatlar
  reducers: {
    setPausedOrders: (state, action) => {
      state.pausedOrders = action.payload;
    },
    setProcessOrders: (state, action) => {
      state.processOrders = action.payload;
    },
    setFinishedOrders: (state, action) => {
      state.finishedOrders = action.payload;
    },
  },
});

//Reducer va action nomlari bir xil nomlanadi(standardga kura).

export const { setPausedOrders, setProcessOrders, setFinishedOrders } =
  ordersPageSlice.actions;

//yahlit holatda esa store.ts(reduce store)ga boglash un. yani export const store = configureStore({ reducer: { },});
const OrdersPageReducer = ordersPageSlice.reducer;
export default OrdersPageReducer;
//bu reducer react storega boglangan hisoblanadi
