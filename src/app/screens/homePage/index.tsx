import React, { useEffect } from "react";
import Statistics from "./Statistics";
import Advertisement from "./Advertisement";
import NewDishes from "./NewArrivals";
import PopularDishes from "./PopularProducts";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import "../../../css/home.css";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { retrievePopularDishes } from "./selector";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import PopularProducts from "./PopularProducts";
import NewArrivals from "./NewArrivals";

/** REDUX SLICE & SELECTOR */

const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
}); // bu yerda setPopularDishes: kommanda, dispatch(setPopularDishes(data)) dispatch ichidagi esa action(slice.ts dagi).

//TODO: Selectorni qaerda ishlatmoqchi bulsak usha yerda call qilamiz. bu yerda yozish kkmas.(masalan: Sectional componentlarda)
/* Yuklangan malumotni tugridan tugri shu yerdan qabul qb, vu wu yerda ishlatsak.
const popularDishesRetriever = createSelector(
  retrievePopularDishes,
  (popularDishes) => ({ popularDishes }),
);*/

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch()); //call

  //TODO: Selectorni qaerda ishlatmoqchi bulsak usha yerda call qilamiz. bu yerda yozish kkmas.(masalan: Sectional componentlarda)
  /*Selector: Store => Data(store dan datani qabul qlish)
  const { popularDishes } = useSelector(popularDishesRetriever);//call*/

  useEffect(() => {
    //Backend server data request => Data(backendan datani qabul qlish).
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH,
      })
      .then((data) => {
        setPopularDishes(data); //Redux store ga data ni yozish(slice)
      })
      .catch((err) => console.log(err));

    //Fresh menu
    product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt",
        //productCollection: ProductCollection.DISH, => quymasa ham buladi.(ohirgi qushilgan drinklarni ham ob berish un)
      })
      .then((data) => {
        setNewDishes(data); //Redux store ga data ni yozish(slice)
      })
      .catch((err) => console.log(err));

    //Active Users
    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => {
        setTopUsers(data); //Redux store ga data ni yozish(slice)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularProducts />
      <NewArrivals />
      <Advertisement />
      <ActiveUsers />
      <Events />
    </div>
  );
}
