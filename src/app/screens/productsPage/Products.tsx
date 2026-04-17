import React, { ChangeEvent, useEffect, useState } from "react";
import { Box, Button, Container, Stack } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Badge from "@mui/material/Badge";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import ProductService from "../../services/ProductService";
import {
  ProductCollection,
  ProductVolume,
} from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR */

//slice
const actionDispatch = (dispatch: Dispatch) => ({
  setProducts: (data: Product[]) => dispatch(setProducts(data)),
});

//selector
const productsRetriever = createSelector(retrieveProducts, (products) => ({
  products,
}));

//Doim Backend datalarni Service lar orqali malumotlarni olamiz.

interface ProductsProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsProps) {
  const { onAdd } = props;
  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  //Maxsus object hosil qlamz useState orqali(user interactive qlish un).
  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt", // boshida 'NEW' buttoni bosilgan buladi
    productCollection: ProductCollection.DISH, //chunki dastlab productPage kirib kelganda, "DISH" buttoni bosilgan buladi.
    search: "", //search qismida hechnarsa yozilmagan buliwi kk.
  });

  const [searchText, setSearchText] = useState<string>("");

  const history = useHistory(); //kod orqali boshqa sahifaga o'tkazish.(chooseDishHandler ga ishlatamiz)

  //Doim Backend datalarni Service lar orqali malumotlarni olamiz.
  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]); //bu yerda productSearch qiymati har safar uzgarganda backenddan malumotlarni olib beradi, yani yana useEffect qayta tushishini takidlayapmiz.(bu componentDidUpdate lifecycle.). bu user interactionlarda ishga tushadi.

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]); //inputdagi searchText qilgandan kn "X" bossak, bush stringa aylantirish un (yani bowqa productni izlash un) shu useEffectdan foydalanamiz.

  /**HANDLERS */

  //searchCollectionHandler
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1; //shu btnlar har bosilganda, page 1 ga olib kelsin degani.
    productSearch.productCollection = collection;
    setProductSearch({ ...productSearch }); //bunda spread operatorini qullab, productSrearch qiymatlaridan foydalangan holda yangi object yaratamiz, bulmasa useEffect ishga tuwmaydi. - bunday qilishimzning sababi bu obj. reference tushunchasi bn boqliq.
  };

  //searchOrderHandler
  const searchOrderHandler = (order: string) => {
    productSearch.page = 1;
    productSearch.order = order;
    setProductSearch({ ...productSearch });
  };

  //searchProductHandler
  const searchProductHandler = () => {
    productSearch.search = searchText;
    setProductSearch({ ...productSearch });
  };

  //PaginationHandler
  const PaginationHandler = (e: ChangeEvent<any>, value: number) => {
    productSearch.page = value;
    setProductSearch({ ...productSearch });
  }; // bu yerda MUI bydefault 2ta qiymat beradi, ChangeEvent va value, bizga value kk ishlatishga.

  // chooseDishHandler
  const chooseDishHandler = (id: string) => {
    history.push(`/products/${id}`);
  }; //history.push - bu malum bir productni bosganda chosenProductPage sahifasiga yuboradi)

  return (
    <div className={"products"}>
      <Container>
        <Stack flexDirection={"column"} alignItems={"center"}>
          <Stack
            className={"avatar-big-box"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"flex-end"}
          >
            <Typography className="top-text">Burak Restaurant</Typography>
            <Stack className="search-input-btn">
              <input
                type="search"
                className="single-search-input"
                name="singleResearch"
                placeholder="Type here"
                value={searchText} // useStatedagi shuni bowlangich value sifatida quyamiz.
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }} //bu listener, klaviaturadagi 'enter' tugmasi bosilgandan searchProductHandler() ishga tushir degani.
              />

              <Button
                variant="contained"
                sx={{ borderRadius: 25 }}
                onClick={
                  searchProductHandler
                } /**hech qanday qiymat quyilmaganligi un 1 satr yozdik */
              >
                Search <SearchIcon sx={{ ml: 1 }} />
              </Button>
            </Stack>
          </Stack>
          <Stack className={"dishes-filter-section"}>
            <Stack
              className={"dishes-filter-box"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "createdAt" ? "primary" : "secondary"
                }
                onClick={() => searchOrderHandler("createdAt")}
              >
                New
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productPrice"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productPrice")}
              >
                Price
              </Button>
              <Button
                variant={"contained"}
                className={"order"}
                color={
                  productSearch.order === "productViews"
                    ? "primary"
                    : "secondary"
                }
                onClick={() => searchOrderHandler("productViews")}
              >
                Views
              </Button>
            </Stack>
          </Stack>

          <Stack
            className={"list-category-section"}
            flexDirection={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack className={"product-category"}>
              <div className={"category-main"}>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.OTHER
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.OTHER)
                  }
                >
                  Other
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection ===
                    ProductCollection.DESSERT
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DESSERT)
                  }
                >
                  Dessert
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DRINK
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DRINK)
                  }
                >
                  Drink
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.SALAD
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.SALAD)
                  }
                >
                  Salad
                </Button>
                <Button
                  variant={"contained"}
                  color={
                    productSearch.productCollection === ProductCollection.DISH
                      ? "primary"
                      : "secondary"
                  }
                  onClick={() =>
                    searchCollectionHandler(ProductCollection.DISH)
                  }
                >
                  Dish
                </Button>
              </div>
            </Stack>
            <Stack className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  const sizeVolume =
                    product.productCollection === ProductCollection.DRINK
                      ? product.productVolume + " L"
                      : product.productSize + " SIZE";
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{ backgroundImage: `url(${imagePath})` }}
                      >
                        <div className={"product-sale"}>{sizeVolume}</div>
                        <Button
                          className={"shop-btn"}
                          onClick={(e) => {
                            onAdd({
                              _id: product._id,
                              quantity: 1, //quantity doim 1 ta tovar qushish kk.
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation(); //bosilganda parent event ishlamasligi un, yani aynan shu Button ishlashi un.
                          }}
                        >
                          <img
                            src={"/icons/shopping-cart.svg"}
                            style={{ display: "flex" }}
                            alt=""
                          />
                        </Button>
                        <Button className={"view-btn"} sx={{ right: "36px" }}>
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                              }}
                            />
                          </Badge>
                        </Button>
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className={"product-price"}>
                          <MonetizationOnIcon sx={{ fontSize: 28 }} />
                          {product.productPrice}
                        </div>{" "}
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </Stack>
          </Stack>
          <Stack className={"pagination-section"}>
            <Pagination
              count={
                products.length !== 0
                  ? productSearch.page + 1
                  : productSearch.page
              } //countni qiymatini yangilash.(yani pageda productlar bor bulsa, kngi yana 1ta page qush, yoki bulmasam qushma degani.)
              page={productSearch.page}
              renderItem={(item) => (
                <PaginationItem
                  components={{
                    previous: ArrowBackIcon,
                    next: ArrowForwardIcon,
                  }}
                  {...item}
                  color={"secondary"}
                />
              )}
              onChange={PaginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      <div className={"brands-logo"}>
        <Container>
          <Stack
            className={"brands-logo-sub"}
            flexDirection={"column"}
            alignItems={"center"}
          >
            <Typography className="brand-title">Our Family Brands</Typography>
            <Stack
              className="brand-logo-ram"
              flexDirection={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
              sx={{ mt: "69px" }}
            >
              <img className="brand-logo-image" src="/img/gurme.webp" alt="" />
              <img className="brand-logo-image" src="/img/gurme.webp" alt="" />
              <img className="brand-logo-image" src="/img/gurme.webp" alt="" />
              <img className="brand-logo-image" src="/img/gurme.webp" alt="" />
            </Stack>
          </Stack>
        </Container>
      </div>
      <div className={"address"}>
        <Container>
          <Stack className={"address-area"}>
            <Box className={"address-title"}>Our address</Box>
            <iframe
              style={{ marginTop: "60px", marginBottom: "60px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25859.219637661423!2d128.60129279999998!3d35.88815774999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e1aa3b33a607%3A0xca08be7329f6a0ca!2sEXCO!5e0!3m2!1sen!2skr!4v1771668833177!5m2!1sen!2skr"
              referrerPolicy="no-referrer-when-downgrade"
              width="1320"
              height="500"
            ></iframe>
          </Stack>
        </Container>
      </div>
    </div>
  );
}
