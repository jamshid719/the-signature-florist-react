import React, { useEffect } from "react";
import { Container, Stack, Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Divider from "../../components/divider";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { retrieveChosenProduct, retrieveShop } from "./selector";
import { Member } from "../../../lib/types/member";
import { setChosenProduct, setShop } from "./slice";
import { Product } from "../../../lib/types/product";
import { useParams } from "react-router-dom";
import ProductService from "../../services/ProductService";
import MemberService from "../../services/MemberService";
import { Messages, serverApi } from "../../../lib/config";
import { CartItem } from "../../../lib/types/search";
import { useLike } from "../../hooks/useLike";
import { sweetErrorHandling } from "../../../lib/sweetAlert";
import { useGlobals } from "../../hooks/useGlobal";

/** REDUX SLICE & SELECTOR */

//slice
const actionDispatch = (dispatch: Dispatch) => ({
  setShop: (data: Member) => dispatch(setShop(data)),
  setChosenProduct: (data: Product) => dispatch(setChosenProduct(data)),
});

//selector
const shopRetriever = createSelector(retrieveShop, (shop) => ({ shop }));

const chosenProductRetriever = createSelector(
  retrieveChosenProduct,
  (chosenProduct) => ({ chosenProduct }),
);

interface ChosenProductProps {
  onAdd: (item: CartItem) => void;
}

export default function ChosenProduct(props: ChosenProductProps) {
  const { onAdd } = props;
  const { authMember } = useGlobals();
  //hook
  const { productId } = useParams<{ productId: string }>();
  console.log("productId:", productId);

  const { chosenProduct } = useSelector(chosenProductRetriever); //call
  const { shop } = useSelector(shopRetriever);
  const { setShop, setChosenProduct } = actionDispatch(useDispatch()); // call

  useEffect(() => {
    const product = new ProductService();
    product
      .getProduct(productId)
      .then((data) => setChosenProduct(data))
      .catch((err) => console.log(err));

    //product malumotidan tashqari restaurant malumoti ham kk.
    const member = new MemberService();
    member
      .getShop()
      .then((data) => setShop(data))
      .catch((err) => console.log(err));
  }, []);

  if (!chosenProduct) return null;

  return (
    <div className={"chosen-product"}>
      <Box className={"title"}>Product Detail</Box>
      <Container className={"product-container"}>
        <Stack className={"chosen-product-slider"}>
          <Swiper
            loop={true}
            spaceBetween={10}
            navigation={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="swiper-area"
          >
            {chosenProduct?.productImages.map((ele: string, index: number) => {
              const imagePath = `${serverApi}/${ele}`;
              return (
                <SwiperSlide key={index}>
                  <img className="slider-image" src={imagePath} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Stack>
        <div className={"product-detail"}>
          <Container>
            <Stack alignItems={"flex-start"}>
              <div className={"product-detail-card"}>
                {/* Title */}
                <Typography className={"product-detail-title"}>
                  {chosenProduct.productName}
                </Typography>

                {/* Price */}
                <Stack
                  className={"product-detail-price"}
                  flexDirection={"row"}
                  alignItems={"center"}
                >
                  <span className={"product-detail-new-price"}>
                    ${chosenProduct.productPrice}.00
                  </span>
                </Stack>

                {/* Divider */}
                <div className={"product-detail-divider"} />

                {/* Description */}
                <Typography className={"product-detail-desc"}>
                  {chosenProduct.productDesc}
                </Typography>

                {/* Actions */}
                <Stack
                  className={"product-detail-actions"}
                  flexDirection={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  {/* Add to cart */}
                  <button
                    className={`product-detail-cart-btn  ${chosenProduct.productLeftCount <= 0 ? "btn-disabled" : ""}`}
                    disabled={chosenProduct.productLeftCount <= 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!authMember) {
                        sweetErrorHandling(new Error(Messages.error2)).then();
                        return;
                      }
                      if (chosenProduct.productLeftCount <= 0) return;
                      console.log("PRESSED");
                      onAdd({
                        _id: chosenProduct._id,
                        quantity: 1,
                        name: chosenProduct.productName,
                        price: chosenProduct.productPrice,
                        image: chosenProduct.productImages[0],
                      });
                      e.stopPropagation();
                    }}
                  >
                    {chosenProduct.productLeftCount <= 0
                      ? "Sold out"
                      : "Add to cart"}
                  </button>
                  {/* Add to wishlist */}
                  <button
                    className={"product-detail-cart-btn"}
                    style={{
                      backgroundColor: "#eb7661",
                      marginRight: "100px",
                      padding: "0 20px",
                    }}
                  >
                    Add to Wishlist
                  </button>

                  {/* View icon button */}
                  <Box
                    className={"product-detail-view-btn"}
                    component={"button"}
                  >
                    <RemoveRedEyeIcon sx={{ fontSize: 20 }} />
                    <span
                      style={{
                        marginLeft: "4px",
                        fontSize: "14px",
                        fontWeight: "600",
                      }}
                    >
                      {chosenProduct.productViews}
                    </span>
                  </Box>
                </Stack>
              </div>
            </Stack>
          </Container>
        </div>
      </Container>
    </div>
  );
}
