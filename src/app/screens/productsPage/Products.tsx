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
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveProducts } from "./selector";
import { Product, ProductInquiry } from "../../../lib/types/product";
import { setProducts } from "./slice";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { serverApi } from "../../../lib/config";
import { useHistory } from "react-router-dom";
import { useGlobals } from "../../hooks/useGlobal";
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

interface ProductsPageProps {
  onAdd: (item: CartItem) => void;
}

export default function Products(props: ProductsPageProps) {
  const { onAdd } = props;

  const { authMember } = useGlobals();

  const { setProducts } = actionDispatch(useDispatch());
  const { products } = useSelector(productsRetriever);

  const [productSearch, setProductSearch] = useState<ProductInquiry>({
    page: 1,
    limit: 8,
    order: "createdAt",
    productCollection: ProductCollection.BOUQUET,
    search: "",
  });

  const [searchText, setSearchText] = useState<string>("");

  useEffect(() => {
    const product = new ProductService();
    product
      .getProducts(productSearch)
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, [productSearch]);

  useEffect(() => {
    if (searchText === "") {
      productSearch.search = "";
      setProductSearch({ ...productSearch });
    }
  }, [searchText]); //inputdagi searchText qilgandan kn "X" bossak, bush stringa aylantirish un (yani bowqa productni izlash un) shu useEffectdan foydalanamiz.

  const history = useHistory(); //kod orqali boshqa sahifaga o'tkazish.(chooseDishHandler ga ishlatamiz)

  /**HANDLERS */

  //searchCollectionHandler
  const searchCollectionHandler = (collection: ProductCollection) => {
    productSearch.page = 1; //btnlar har bosilganda, page 1 ga olib kelsin degani.
    productSearch.productCollection = collection;
    productSearch.search = "";
    setProductSearch({ ...productSearch }); //for working useEffect
  };

  //searchAllCollection
  const searchAllCollectionHandler = () => {
    productSearch.page = 1;
    productSearch.productCollection = undefined;
    productSearch.excludeCollection = ProductCollection.OTHER;
    productSearch.search = "";
    setSearchText("");
    setProductSearch({ ...productSearch });
  };

  //searchCollectionHandler
  const searchRosesHandler = (search: string) => {
    productSearch.page = 1;
    productSearch.search = search;
    productSearch.productCollection = ProductCollection.BOUQUET;
    setSearchText("");
    setProductSearch({ ...productSearch });
  };

  const searchTulipsHandler = (search: string) => {
    productSearch.page = 1;
    productSearch.search = search;
    productSearch.productCollection = ProductCollection.BOUQUET;
    setSearchText("");
    setProductSearch({ ...productSearch });
  };

  const searchSpecialHandler = (search: string) => {
    productSearch.page = 1;
    productSearch.search = search;
    productSearch.productCollection = ProductCollection.BOUQUET;
    setSearchText("");
    setProductSearch({ ...productSearch });
  };

  const searchRedHandler = (search: string) => {
    productSearch.page = 1;
    productSearch.search = search;
    productSearch.productCollection = ProductCollection.BOUQUET;
    setSearchText("");
    setProductSearch({ ...productSearch });
  };

  const searchYellowHandler = (search: string) => {
    productSearch.page = 1;
    productSearch.search = search;
    productSearch.productCollection = ProductCollection.BOUQUET;
    setSearchText("");
    setProductSearch({ ...productSearch });
  };

  //searchOrderHandler
  const searchOrderHandler = (order: string) => {
    productSearch.page = 1; //btnlar har bosilganda, page 1 ga olib kelsin degani.
    productSearch.order = order;
    setProductSearch({ ...productSearch }); //for working useEffect
  };

  //searchProductHandler
  const searchProductHandler = () => {
    console.log("searchText:", searchText);
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
          {/* ── Title + Search ── */}
          <Stack
            className={"avatar-big-box"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
          >
            <Typography className="top-text">Shop</Typography>
            <Stack className="search-input-btn" flexDirection={"row"}>
              <input
                type="search"
                className="single-search-input"
                name="singleResearch"
                placeholder="Find product"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") searchProductHandler();
                }}
              />
              <button
                className="search-btn-icon"
                onClick={searchProductHandler}
              >
                <SearchIcon sx={{ fontSize: 20 }} />
              </button>
            </Stack>
          </Stack>

          {/* ── Circle Category Filter ── */}
          <Stack className={"dishes-filter-section"}>
            <Stack
              className={"dishes-filter-box"}
              flexDirection={"row"}
              alignItems={"center"}
            >
              <button
                className="circle-category-btn active-cat"
                onClick={() => searchAllCollectionHandler()}
              >
                <div className="circle-img-wrap">
                  <img src="/img/All_Products.jpg" alt="" />
                  <div className="circle-overlay">
                    <span>All Products</span>
                  </div>
                </div>
              </button>
              <button
                className="circle-category-btn active-cat"
                onClick={() => searchRosesHandler("rose")}
              >
                <div className="circle-img-wrap">
                  <img src="/img/roses.jpg" alt="" />
                  <div className="circle-overlay">
                    <span>Roses</span>
                  </div>
                </div>
              </button>
              <button
                className="circle-category-btn active-cat"
                onClick={() => searchTulipsHandler("tulip")}
              >
                <div className="circle-img-wrap">
                  <img src="/img/assorted tulips_2.jpg" alt="" />
                  <div className="circle-overlay">
                    <span>Tulips</span>
                  </div>
                </div>
              </button>
              <button
                className="circle-category-btn active-cat"
                onClick={() => searchSpecialHandler("special")}
              >
                <div className="circle-img-wrap">
                  <img src="/img/Special_flowers.webp" alt="" />
                  <div className="circle-overlay">
                    <span>Special</span>
                  </div>
                </div>
              </button>
              <button
                className="circle-category-btn active-cat"
                onClick={() => searchRedHandler("red")}
              >
                <div className="circle-img-wrap">
                  <img src="/img/red.jpg" alt="" />
                  <div className="circle-overlay">
                    <span>Red</span>
                  </div>
                </div>
              </button>
              <button
                className="circle-category-btn active-cat"
                onClick={() => searchYellowHandler("yellow")}
              >
                <div className="circle-img-wrap">
                  <img src="/img/Yellow.jpg" alt="" />
                  <div className="circle-overlay">
                    <span>Yellow</span>
                  </div>
                </div>
              </button>
            </Stack>
          </Stack>

          {/* ── Sort + Filter + Products ── */}
          <Stack
            className={"list-category-section"}
            flexDirection={"column"}
            alignItems={"flex-start"}
          >
            {/* Sort + Filter row */}
            <div className="sort-filter-row">
              <button
                className={`filter-btn ${productSearch.productCollection === ProductCollection.BOUQUET ? "active-filter" : ""}`}
                onClick={() =>
                  searchCollectionHandler(ProductCollection.BOUQUET)
                }
              >
                Bouquet
              </button>
              <button
                className={`filter-btn ${productSearch.productCollection === ProductCollection.VASE ? "active-filter" : ""}`}
                onClick={() => searchCollectionHandler(ProductCollection.VASE)}
              >
                Vased
              </button>
              <button
                className={`filter-btn ${productSearch.productCollection === ProductCollection.HOUSEPLANT ? "active-filter" : ""}`}
                onClick={() =>
                  searchCollectionHandler(ProductCollection.HOUSEPLANT)
                }
              >
                Houseplant
              </button>
              <button
                className={`filter-btn ${productSearch.productCollection === ProductCollection.TREE ? "active-filter" : ""}`}
                onClick={() => searchCollectionHandler(ProductCollection.TREE)}
              >
                Tree
              </button>
              <button
                className={`filter-btn ${productSearch.productCollection === ProductCollection.OTHER ? "active-filter" : ""}`}
                onClick={() => searchCollectionHandler(ProductCollection.OTHER)}
              >
                Other
              </button>
              <select
                className="sort-select"
                onChange={(e) => searchOrderHandler(e.target.value)}
              >
                <option>Default sorting</option>
                <option value="productViews">Sort by popularity</option>
                <option value="productPrice">Sort by price: low to high</option>
                <option value="createdAt">Sort by newest</option>
              </select>
            </div>

            {/* Product grid */}
            <div className={"product-wrapper"}>
              {products.length !== 0 ? (
                products.map((product: Product) => {
                  const imagePath = `${serverApi}/${product.productImages[0]}`;
                  return (
                    <Stack
                      key={product._id}
                      className={"product-card"}
                      onClick={() => chooseDishHandler(product._id)}
                    >
                      <Stack
                        className={"product-img"}
                        sx={{
                          backgroundImage: `url(${imagePath})`,
                          position: "relative",
                          overflow: "hidden",
                        }}
                      >
                        <div className={"product-size"}>
                          {product.productCollection === ProductCollection.TREE
                            ? product.productVolume
                                ?.split(" ")
                                .map(
                                  (word, index) =>
                                    index === 0
                                      ? word // "3" — o'zgarmaydi
                                      : word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase(), // "YEARS" → "Years"
                                )
                                .join(" ")
                            : product.productCollection ===
                                ProductCollection.OTHER
                              ? product.productItemSize
                                  ?.charAt(0)
                                  .toUpperCase() +
                                product.productItemSize?.slice(1).toLowerCase()
                              : product.productSize?.charAt(0).toUpperCase() +
                                product.productSize?.slice(1).toLowerCase()}
                        </div>
                        <Box
                          sx={{
                            position: "absolute",
                            bottom: "8px",
                            right: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                          }}
                        >
                          <Badge
                            badgeContent={product.productViews}
                            color="secondary"
                            sx={{
                              "& .MuiBadge-badge": {
                                top: "4px",
                                right: "4px",
                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                color: "white",
                                fontSize: "16px",
                                minWidth: "16px",
                                height: "16px",
                              },
                            }}
                          >
                            <RemoveRedEyeIcon
                              sx={{
                                color:
                                  product.productViews === 0 ? "gray" : "white",
                                fontSize: 25,
                              }}
                            />
                          </Badge>
                        </Box>

                        <Button className={"shop-btn"} />
                        <Button className={"view-btn"} sx={{ right: "36px" }} />
                      </Stack>
                      <Box className={"product-desc"}>
                        <span className="product-title">
                          {product.productName}
                        </span>
                        <div className="product-price">
                          {authMember?.memberFirstOrder ? (
                            <>
                              <span className="old-price">
                                ${product.productPrice.toFixed(2)}
                              </span>
                              <span className="new-price">
                                ${(product.productPrice * 0.7).toFixed(2)}
                              </span>
                            </>
                          ) : (
                            <span>${product.productPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <button
                          className="add-to-cart-btn"
                          onClick={(e) => {
                            console.log("PRESSED");
                            onAdd({
                              _id: product._id,
                              quantity: 1,
                              name: product.productName,
                              price: product.productPrice,
                              image: product.productImages[0],
                            });
                            e.stopPropagation();
                          }}
                        >
                          Add to cart
                        </button>
                      </Box>
                    </Stack>
                  );
                })
              ) : (
                <Box className="no-data">Products are not available!</Box>
              )}
            </div>
          </Stack>

          {/* ── Pagination ── */}
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
                />
              )}
              onChange={PaginationHandler}
            />
          </Stack>
        </Stack>
      </Container>

      {/* ── Discount Banner ── */}
      <div className={"discount-banner"}>
        <Container>
          <Stack alignItems={"center"}>
            <div className={"discount-banner-inner"}>
              <img
                className={"discount-banner-bg"}
                src={"/img/banner-leaf.jpg"}
                alt="banner"
              />
              <div className={"discount-banner-content"}>
                <Typography className={"discount-title"}>
                  Discount up to 30% for your first purchase.
                </Typography>
                <Typography className={"discount-desc"}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                  elit tellus, luctus nec ullamcorper mattis, pulvinar leo.
                </Typography>
                <button className={"discount-shop-btn"}>Shop Now</button>
              </div>
            </div>
          </Stack>
        </Container>
      </div>

      {/* ── Address ── */}

      <Container disableGutters>
        <Stack className={"address-area"}>
          <Box className={"address-title"}>Our address</Box>
          <div className={"map-wrapper"}>
            <iframe
              style={{ marginTop: "0px", marginBottom: "0px" }}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d25859.219637661423!2d128.60129279999998!3d35.88815774999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3565e1aa3b33a607%3A0xca08be7329f6a0ca!2sEXCO!5e0!3m2!1sen!2skr!4v1771668833177!5m2!1sen!2skr"
              referrerPolicy="no-referrer-when-downgrade"
              width="100%"
              height="500"
            ></iframe>
          </div>
        </Stack>
      </Container>
    </div>
  );
}
